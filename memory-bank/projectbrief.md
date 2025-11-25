# MacInitiate Project Brief

## Core Purpose
MacInitiate is a web application that allows users to select macOS applications and system tweaks, then generates a downloadable, fault-tolerant Bash script (`install.sh`) for automated installation and configuration.

## Primary Goals
1. **User Experience**: Provide an intuitive interface for selecting apps and tweaks
2. **Script Generation**: Create robust, error-resistant installation scripts
3. **Reliability**: Ensure generated scripts handle failures gracefully without stopping
4. **Automation**: Minimize manual setup steps for new macOS installations

## Key Features
- Web-based app/tweak selection interface
- Real-time script generation on client side
- Downloadable Bash scripts with comprehensive error handling
- Preset configurations for common use cases (Dev, Gamer, etc.)
- System tweak implementation with service management

## Technical Requirements
- React/Next.js frontend
- TypeScript for type safety
- Client-side script generation
- Robust Bash script output with fault tolerance
- Modern UI/UX with clear visual feedback

## Success Metrics
- Generated scripts install successfully on fresh macOS installations
- Users can select and generate custom installation scripts within 2 minutes
- Scripts handle network failures, missing dependencies, and individual app installation failures gracefully
