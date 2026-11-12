import Foundation
import Vision
import AppKit
import CoreImage

let args = CommandLine.arguments
guard args.count == 3, let source = NSImage(contentsOfFile: args[1]), let cg = source.cgImage(forProposedRect: nil, context: nil, hints: nil) else { fatalError("usage: cutout source output") }
let handler = VNImageRequestHandler(cgImage: cg)
let request = VNGenerateForegroundInstanceMaskRequest()
try handler.perform([request])
guard let result = request.results?.first else { fatalError("No foreground") }
let instances = result.allInstances
print("Instances:", instances)
let maskBuffer = result.instanceMask
CVPixelBufferLockBaseAddress(maskBuffer, .readOnly)
let w = CVPixelBufferGetWidth(maskBuffer), h = CVPixelBufferGetHeight(maskBuffer), stride = CVPixelBufferGetBytesPerRow(maskBuffer)
let pixels = CVPixelBufferGetBaseAddress(maskBuffer)!.assumingMemoryBound(to: UInt8.self)
let center = Int(pixels[Int(Double(h) * 0.55) * stride + Int(Double(w) * 0.65)])
CVPixelBufferUnlockBaseAddress(maskBuffer, .readOnly)
guard center != 0 else { fatalError("Subject not found at face center") }
let mask = try result.generateScaledMaskForImage(forInstances: IndexSet(integer: center), from: handler)
let original = CIImage(cgImage: cg)
let alpha = CIImage(cvPixelBuffer: mask)
let clear = CIImage(color: .clear).cropped(to: original.extent)
let cutout = original.applyingFilter("CIBlendWithMask", parameters: [kCIInputBackgroundImageKey: clear, kCIInputMaskImageKey: alpha])
let context = CIContext()
let output = context.createCGImage(cutout, from: original.extent)!
let bitmap = NSBitmapImageRep(cgImage: output)
try bitmap.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: args[2]))
print("Saved", args[2], cg.width, cg.height, "subject", center)
// A separate person matte recovers a disconnected raised hand. It must be
// region-isolated and visually reviewed before compositing with the main mask.
let person = VNGeneratePersonSegmentationRequest()
person.qualityLevel = .accurate
person.outputPixelFormat = kCVPixelFormatType_OneComponent8
try handler.perform([person])
if let personResult = person.results?.first {
    let ci = CIImage(cvPixelBuffer: personResult.pixelBuffer)
    let scaled = ci.transformed(by: CGAffineTransform(scaleX: Double(cg.width) / ci.extent.width, y: Double(cg.height) / ci.extent.height))
    let personCG = context.createCGImage(scaled, from: original.extent)!
    let rep = NSBitmapImageRep(cgImage: personCG)
    try rep.representation(using: .png, properties: [:])!.write(to: URL(fileURLWithPath: args[2].replacingOccurrences(of: ".png", with: "-people.png")))
}
