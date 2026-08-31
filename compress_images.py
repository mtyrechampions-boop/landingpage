import os
from PIL import Image

# Dynamically locate the public/images folder relative to the script location
base_dir = os.path.dirname(os.path.abspath(__file__))
images_dir = os.path.join(base_dir, "public", "images")

def convert_to_webp(filename, quality=80):
    src_path = os.path.join(images_dir, filename)
    name, ext = os.path.splitext(filename)
    dest_path = os.path.join(images_dir, f"{name}.webp")
    
    if not os.path.exists(src_path):
        print(f"Skipping {filename}: File not found.")
        return
        
    try:
        im = Image.open(src_path)
        
        # Check if the image is animated
        is_animated = getattr(im, "is_animated", False)
        
        if is_animated:
            print(f"Converting animated GIF: {filename} -> {name}.webp")
            # For animated GIFs, we must load all frames and preserve delays
            frames = []
            durations = []
            
            # Read all frames
            for frame_idx in range(im.n_frames):
                im.seek(frame_idx)
                # Copy frame to memory
                frame = im.copy().convert("RGBA")
                frames.append(frame)
                # Get frame duration (default to 100ms if not specified)
                durations.append(im.info.get("duration", 100))
            
            # Save frames as animated WebP
            frames[0].save(
                dest_path,
                save_all=True,
                append_images=frames[1:],
                format="WEBP",
                quality=quality,
                loop=im.info.get("loop", 0),
                duration=durations,
                optimize=True
            )
        else:
            print(f"Converting static image: {filename} -> {name}.webp")
            # For static images
            rgb_im = im.convert("RGB")
            rgb_im.save(dest_path, "WEBP", quality=quality, optimize=True)
            
        old_size = os.path.getsize(src_path)
        new_size = os.path.getsize(dest_path)
        reduction = (old_size - new_size) / old_size * 100
        print(f"Successfully converted {filename}! Size reduced from {old_size/1024/1024:.2f}MB to {new_size/1024/1024:.2f}MB ({reduction:.1f}% reduction)")
    except Exception as e:
        print(f"Failed to convert {filename}: {e}")

# List of files to convert
files_to_convert = [
    "Premium Tyre Service.gif",
    "Untitled-design-7-2.png",
    "mobile-tyre-champions-van1.jpeg",
    "fitting-step.png",
    "cta-bg.png",
    "emergency mobile tyre  (1).png"
]

for f in files_to_convert:
    convert_to_webp(f)
