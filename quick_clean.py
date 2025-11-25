#!/usr/bin/env python3

import re

def quick_clean():
    with open('/Users/egeozten/Documents/MacInitiate/src/data/apps.ts', 'r') as f:
        content = f.read()
    
    lines = content.split('\n')
    
    # Find app names and their line numbers
    app_names = {}
    for i, line in enumerate(lines):
        if "name: '" in line:
            match = re.search(r"name: '([^']+)'", line)
            if match:
                name = match.group(1)
                if name not in app_names:
                    app_names[name] = []
                app_names[name].append(i)
    
    # Find duplicates (keep first, remove others)
    duplicates = []
    for name, line_numbers in app_names.items():
        if len(line_numbers) > 1:
            # Keep the first one, mark others for removal
            duplicates.extend(line_numbers[1:])
            print(f"Removing duplicate: {name} at lines {[ln+1 for ln in line_numbers[1:]]}")
    
    # Remove duplicates (reverse order to maintain indices)
    duplicates.sort(reverse=True)
    
    for line_num in duplicates:
        # Find the start and end of this app block
        start = line_num
        while start > 0 and lines[start-1].strip() != ',':
            start -= 1
        
        end = line_num
        while end < len(lines) and lines[end].strip() != '},':
            end += 1
        
        # Remove the block
        del lines[start:end+1]
        print(f"Deleted lines {start+1} to {end+1}")
    
    # Write back
    with open('/Users/egeozten/Documents/MacInitiate/src/data/apps.ts', 'w') as f:
        f.write('\n'.join(lines))
    
    print(f"Cleaned {len(duplicates)} duplicates")

if __name__ == "__main__":
    quick_clean()
