import { StickyActionButtons } from "./features/index.js";

class NovaUiToolkit {
    constructor() {
        this.features = [];
        this.init();
    }

    init() {
        // Get configuration from Nova's appConfig
        const config = this.getConfig();

        // Initialize features based on configuration
        this.initializeFeatures(config);
    }

    getConfig() {
        return (
            window.Nova?.appConfig?.nova_ui_toolkit ||
            window.Nova?.appConfig?.novaUiToolkitConfig ||
            {}
        );
    }

    initializeFeatures(config) {
        // Initialize Sticky Action Buttons
        const stickyActionButtons = new StickyActionButtons(config);
        stickyActionButtons.init();
        this.features.push(stickyActionButtons);
    }
}

// Initialize when the script loads
new NovaUiToolkit();
