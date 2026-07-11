(function () {
  "use strict";

  function isConfigured(config) {
    return Boolean(
      config &&
        typeof config.cloudName === "string" &&
        config.cloudName.trim() &&
        config.cloudName !== "REPLACE_WITH_CLOUD_NAME"
    );
  }

  function encodePublicId(publicId) {
    return publicId
      .split("/")
      .map(function (part) {
        return encodeURIComponent(part);
      })
      .join("/");
  }

  function buildUrl(cloudName, publicId, width) {
    var transformations = ["f_auto", "q_auto", "c_limit", "w_" + width].join(",");
    return (
      "https://res.cloudinary.com/" +
      encodeURIComponent(cloudName) +
      "/image/upload/" +
      transformations +
      "/" +
      encodePublicId(publicId)
    );
  }

  function enhanceImages() {
    try {
      var config = window.PORTFOLIO_CLOUDINARY;

      if (!isConfigured(config)) {
        return;
      }

      var widths = Array.isArray(config.widths) && config.widths.length
        ? config.widths
        : [480, 800, 1200, 1600];

      var safeWidths = widths
        .map(function (width) {
          return Number(width);
        })
        .filter(function (width) {
          return Number.isFinite(width) && width > 0 && width <= 2400;
        });

      if (!safeWidths.length) {
        safeWidths = [480, 800, 1200, 1600];
      }

      document.querySelectorAll("img[data-cloudinary-public-id]").forEach(function (image) {
        var publicId = image.getAttribute("data-cloudinary-public-id");

        if (!publicId || !publicId.trim()) {
          return;
        }

        var cleanPublicId = publicId.trim().replace(/^\/+/, "");
        var srcset = safeWidths
          .map(function (width) {
            return buildUrl(config.cloudName.trim(), cleanPublicId, width) + " " + width + "w";
          })
          .join(", ");

        image.srcset = srcset;

        if (!image.getAttribute("sizes")) {
          image.sizes = "(max-width: 850px) calc(100vw - 52px), 1100px";
        }

        image.src = buildUrl(config.cloudName.trim(), cleanPublicId, Math.max.apply(null, safeWidths));
      });
    } catch (error) {
      return;
    }
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", enhanceImages);
  } else {
    enhanceImages();
  }
})();
