import { catalog } from '@/data/appCatalog';

export function generateScript(selectedIds: string[]): string {
  // Separate apps and tweaks from selected IDs
  const selectedApps = catalog.apps.filter(app => selectedIds.includes(app.id));
  const selectedTweaks = catalog.tweaks.filter(tweak => selectedIds.includes(tweak.id));

  const script = `#!/bin/bash

# =============================================================================
# MacInitiate Setup Script
# Generated on ${new Date().toISOString()}
# 
# This script will install \${selectedApps.length} applications and apply \${selectedTweaks.length} system tweaks.
# =============================================================================

# Color definitions for terminal output
RED='\\033[0;31m'
GREEN='\\033[0;32m'
YELLOW='\\033[1;33m'
BLUE='\\033[0;34m'
NC='\\033[0m' # No Color

# Counters for tracking installation progress
success_count=0
failure_count=0
total_items=${selectedApps.length + selectedTweaks.length}
current_item=0

# Function to print colored output
print_status() {
    echo -e "\${BLUE}$1\${NC}"
}

print_success() {
    echo -e "\${GREEN}✓ $1\${NC}"
}

print_error() {
    echo -e "\${RED}✗ $1\${NC}"
}

print_warning() {
    echo -e "\${YELLOW}⚠ $1\${NC}"
}

# Function to check internet connection
check_internet() {
    print_status "Checking internet connection..."
    if ping -c 1 google.com &> /dev/null; then
        print_success "Internet connection is active"
        return 0
    else
        print_error "No internet connection detected"
        print_warning "Please check your internet connection and try again"
        exit 1
    fi
}

# Function to install Homebrew if not present
install_homebrew() {
    print_status "Checking for Homebrew..."
    if command -v brew &> /dev/null; then
        print_success "Homebrew is already installed"
        brew update
    else
        print_status "Installing Homebrew..."
        /bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
        if [ $? -eq 0 ]; then
            print_success "Homebrew installed successfully"
            # Add Homebrew to PATH for this session
            if [[ -x "/opt/homebrew/bin/brew" ]]; then
                eval "$(/opt/homebrew/bin/brew shellenv)"
            else
                eval "$(/usr/local/bin/brew shellenv)"
            fi
        else
            print_error "Failed to install Homebrew"
            exit 1
        fi
    fi
}

# Function to install applications
install_app() {
    local app_name="$1"
    local brew_id="$2"
    current_item=$((current_item + 1))
    
    print_status "Installing [$current_item/$total_items]: $app_name..."
    
    if brew install --cask "$brew_id" 2>/dev/null; then
        print_success "Installed: $app_name"
        success_count=$((success_count + 1))
    else
        # Try regular brew install if cask fails
        if brew install "$brew_id" 2>/dev/null; then
            print_success "Installed: $app_name"
            success_count=$((success_count + 1))
        else
            print_error "Failed to install: $app_name"
            failure_count=$((failure_count + 1))
        fi
    fi
}

# Function to apply system tweaks
apply_tweak() {
    local tweak_name="$1"
    local command="$2"
    local restart_service="$3"
    current_item=$((current_item + 1))
    
    print_status "Applying [$current_item/$total_items]: $tweak_name..."
    
    if eval "$command" 2>/dev/null; then
        print_success "Applied: $tweak_name"
        
        # Restart service if specified
        if [ -n "$restart_service" ]; then
            print_status "Restarting $restart_service..."
            killall "$restart_service" 2>/dev/null || true
            print_success "Restarted: $restart_service"
        fi
        
        success_count=$((success_count + 1))
    else
        print_error "Failed to apply: $tweak_name"
        failure_count=$((failure_count + 1))
    fi
}

# =============================================================================
# MAIN EXECUTION
# =============================================================================

# Prevent computer from sleeping during installation
print_status "Preventing system sleep during installation..."
caffeinate -d -i -m -u -s &
caffeinate_pid=$!
trap "kill $caffeinate_pid 2>/dev/null" EXIT

# Check prerequisites
check_internet
install_homebrew

# Update Homebrew and upgrade existing packages
print_status "Updating Homebrew and upgrading existing packages..."
brew update && brew upgrade

print_status "Starting installation process..."
echo

# Arrays to hold selected apps and tweaks
${selectedApps.length > 0 ? `
declare -a selected_apps=(
${selectedApps.map(app => `    "${app.name}|${app.brew_id}"`).join('\n')}
)` : 'declare -a selected_apps=()'}

${selectedTweaks.length > 0 ? `
declare -a selected_tweaks=(
${selectedTweaks.map(tweak => `    "${tweak.name}|${tweak.command}|${tweak.restart_service || ''}"`).join('\n')}
)` : 'declare -a selected_tweaks=()'}

# Install applications
for app in "\${selected_apps[@]}"; do
    IFS='|' read -r name brew_id <<< "$app"
    install_app "$name" "$brew_id"
    echo
done

# Apply system tweaks
for tweak in "\${selected_tweaks[@]}"; do
    IFS='|' read -r name command restart_service <<< "$tweak"
    apply_tweak "$name" "$command" "$restart_service"
    echo
done

# =============================================================================
# FINAL REPORT
# =============================================================================

print_status "Installation completed!"

echo
echo -e "\${BLUE}==================== FINAL REPORT ====================\${NC}"
echo -e "Total items processed: \${GREEN}$total_items\${NC}"
echo -e "Successfully installed: \${GREEN}$success_count\${NC}"
echo -e "Failed installations:   \${RED}$failure_count\${NC}"

if [ $failure_count -eq 0 ]; then
    echo
    print_success "🎉 All installations completed successfully!"
    print_success "Your Mac is ready to use!"
else
    echo
    print_warning "Some items failed to install. Please check the error messages above."
    print_warning "You can try installing the failed items manually using Homebrew."
fi

echo
echo -e "\${BLUE}=======================================================\${NC}"

# Clean up
brew cleanup
print_status "Cleanup completed. Enjoy your new setup!"

exit 0`;

  return script;
}
