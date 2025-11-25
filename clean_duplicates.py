#!/usr/bin/env python3

import re

def clean_duplicates():
    # Read the file
    with open('/Users/egeozten/Documents/MacInitiate/src/data/apps.ts', 'r') as f:
        content = f.read()
    
    lines = content.split('\n')
    
    # Find all app blocks
    app_blocks = []
    current_block = []
    block_start = 0
    
    for i, line in enumerate(lines):
        if line.strip() == '{' and (i == 0 or lines[i-1].strip() == ','):
            current_block = [(i, line)]
            block_start = i
        elif line.strip() == '},' and current_block:
            current_block.append((i, line))
            app_blocks.append({
                'start': block_start,
                'end': i,
                'lines': current_block
            })
            current_block = []
        elif current_block:
            current_block.append((i, line))
    
    # Extract app names
    app_names = []
    for block in app_blocks:
        name = None
        for line_num, line in block['lines']:
            if 'name:' in line:
                match = re.search(r"name: '([^']+)'", line)
                if match:
                    name = match.group(1)
                    break
        if name:
            app_names.append((name, block))
    
    # Find duplicates (keep first occurrence)
    seen_names = set()
    duplicates_to_remove = []
    
    for name, block in app_names:
        if name in seen_names:
            duplicates_to_remove.append(block)
        else:
            seen_names.add(name)
    
    print(f"Found {len(duplicates_to_remove)} duplicates to remove:")
    for block in duplicates_to_remove:
        for line_num, line in block['lines']:
            if 'name:' in line:
                match = re.search(r"name: '([^']+)'", line)
                if match:
                    print(f"  Removing: {match.group(1)} at lines {block['start']+1}-{block['end']+1}")
                    break
    
    # Remove duplicates (reverse order to maintain line numbers)
    duplicates_to_remove.sort(key=lambda x: x['start'], reverse=True)
    
    for block in duplicates_to_remove:
        del lines[block['start']:block['end']+1]
    
    # Write back
    with open('/Users/egeozten/Documents/MacInitiate/src/data/apps.ts', 'w') as f:
        f.write('\n'.join(lines))
    
    print(f"Successfully removed {len(duplicates_to_remove)} duplicate apps")

if __name__ == "__main__":
    clean_duplicates()
