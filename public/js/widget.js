(() => {
    // Define constants and meaningful variables
    const iframeAttributes = {
        scrolling: "no",
        width: "100%",
        border: "none"
    };

    const waitwisehubEmbedUrl = "https://waitwisehub.blackkalu.com/w/e/";

    // Get current URL and extract the query string
    const currentUrl = window.location.toString();
    const queryString = currentUrl.split("?")[1];

    // Module for iframe creation and injection
    const waitwisehubModule = () => {
        // Create iframe element with specified attributes
        const iframe = document.createElement("iframe");
        Object.entries(iframeAttributes).forEach(([attr, value]) => iframe.style[attr] = value);

        // Iterate over elements with the class "waitwisehub-widget"
        document.querySelectorAll(".waitwisehub-widget").forEach(widgetElement => {
            const widgetKeyId = widgetElement.getAttribute("data-key-id");

            // Append query string to iframe source URL if present
            const iframeSrc = queryString ? `${waitwisehubEmbedUrl}${widgetKeyId}?${queryString}` : `${waitwisehubEmbedUrl}${widgetKeyId}`;
            iframe.src = iframeSrc;

            // Set iframe height based on "data-height" attribute or default to 180px
            const widgetHeight = widgetElement.getAttribute("data-height");
            iframe.style.height = widgetHeight || "260px";

            // Append a cloned iframe to the widget element
            widgetElement.appendChild(iframe.cloneNode(true));
        });
    };

    // Placeholder modules for dynamic loading (if needed)
    const emptyModule1 = () => {};
    const emptyModule2 = () => {};

    // Module loading and execution
    const modules = {
        847: waitwisehubModule, // Main module for iframe creation and injection
        662: emptyModule1,
        666: emptyModule2
    };

    const moduleCache = {};

    function loadModule(moduleId) {
        if (moduleCache[moduleId]) {
            return moduleCache[moduleId].exports;
        }

        const module = moduleCache[moduleId] = { exports: {} };
        modules[moduleId](module, module.exports, loadModule);
        return module.exports;
    }

    // Entry point for module loading and execution
    (() => {
        // Placeholder logic for module dependency resolution
        const moduleDependencies = { 332: 0, 233: 0, 170: 0 };
        loadModule.O = moduleId => moduleDependencies[moduleId] === 0;

        // Function for handling module dependencies
        const handleDependencies = (callback, moduleId, dependencies) => {
            let result;
            if (dependencies.some(dep => moduleDependencies[dep] !== 0)) {
                for (const dep in dependencies) {
                    if (loadModule.O(dep) && moduleDependencies[dep] && moduleDependencies[dep][0]()) {
                        moduleDependencies[dep] = 0;
                    }
                }
                result = callback(loadModule);
            }
            return result;
        };

        // Process webpack chunks
        const webpackChunks = self.webpackChunk = self.webpackChunk || [];
        webpackChunks.forEach(chunk => handleDependencies(chunk, 0));

        // Add a push function to webpack chunks
        webpackChunks.push = (chunk) => handleDependencies(chunk, webpackChunks.push.bind(webpackChunks));

    })();

    // Load and execute the main module (847)
    loadModule(847);

    // Additional modules (if needed)
    loadModule(662);
    const thirdModule = loadModule(666);

    // Optional: Use the result of the third module if necessary
    if (loadModule.O(thirdModule)) {
        const result = thirdModule(loadModule);
    }
})();
