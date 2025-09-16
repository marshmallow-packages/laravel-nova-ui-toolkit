export default class StickyActionButtons {
    constructor(config) {
        this.config = config;
        this.debounceTimer = null;
    }

    init() {
        if (!this.config.sticky_action_buttons) {
            return;
        }

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.applyStickyActions());
        } else {
            this.applyStickyActions();
        }

        // Setup observer for route changes (SPA navigation)
        this.observeRouteChanges();
    }

    applyStickyActions() {
        // Find all Nova index tables
        const tables = document.querySelectorAll("table.w-full");

        tables.forEach((table) => {
            this.processSingleTable(table);
        });
    }

    processSingleTable(table) {
        // Find action columns (typically the last column with action buttons)
        const headerRow = table.querySelector("thead tr");
        const bodyRows = table.querySelectorAll("tbody tr");

        if (!headerRow || !bodyRows.length) return;

        // Check if this table has action columns
        const lastHeaderCell = headerRow.querySelector("th:last-child");
        const hasActions = bodyRows[0]?.querySelector(
            'td:last-child .inline-flex, td:last-child button, td:last-child [dusk*="action"]'
        );

        if (!hasActions) return;

        // Add sticky action styling
        this.makeActionsSticky(table, lastHeaderCell, bodyRows);
    }

    makeActionsSticky(table, headerCell, bodyRows) {
        // Add sticky class to header
        if (headerCell) {
            headerCell.classList.add("nova-sticky-actions-header");
        }

        // Add sticky class to body cells
        bodyRows.forEach((row) => {
            const lastCell = row.querySelector("td:last-child");
            if (lastCell) {
                lastCell.classList.add("nova-sticky-actions-cell");
            }
        });

        // Ensure table has proper positioning context
        const tableContainer = table.closest(
            '.overflow-hidden, .overflow-x-auto, [class*="overflow"]'
        );
        if (tableContainer) {
            tableContainer.classList.add("nova-sticky-table-container");
        }
    }

    observeRouteChanges() {
        // For SPAs, we need to re-apply styles when content changes
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.addedNodes.length > 0) {
                    // Debounce to avoid excessive calls
                    clearTimeout(this.debounceTimer);
                    this.debounceTimer = setTimeout(() => {
                        this.applyStickyActions();
                    }, 100);
                }
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true,
        });
    }
}