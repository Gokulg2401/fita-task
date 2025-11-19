(function () {
  // Helper: parse rotation from transform matrix
  function getRotationFromMatrix(matrix) {
    if (!matrix || matrix === "none") return "0deg";
    var values = matrix.split("(")[1];
    values = values.split(")")[0];
    values = values.split(",");
    var a = parseFloat(values[0]);
    var b = parseFloat(values[1]);
    var angle = Math.round(Math.atan2(b, a) * (180 / Math.PI));
    return angle + "deg";
  }

  function formatSize(w, h) {
    return w + "px × " + h + "px";
  }

  var inspector = document.getElementById("inspector");
  var insAsset = document.getElementById("ins-asset");
  var insPos = document.getElementById("ins-pos");
  var insSize = document.getElementById("ins-size");
  var insNatural = document.getElementById("ins-natural");
  var insRot = document.getElementById("ins-rot");
  var insOpacity = document.getElementById("ins-opacity");
  var insCss = document.getElementById("ins-css");
  var closeBtn = document.getElementById("inspector-close");

  var selected = null;

  function showInspectorFor(element) {
    if (!element) return;
    selected = element;
    var rect = element.getBoundingClientRect();
    var x = Math.round(rect.left + window.scrollX);
    var y = Math.round(rect.top + window.scrollY);
    var w = Math.round(rect.width);
    var h = Math.round(rect.height);

    var elementInfo = getElementInfo(element);
    var naturalW = elementInfo.naturalWidth || "—";
    var naturalH = elementInfo.naturalHeight || "—";

    var cs = window.getComputedStyle(element);
    var transform = cs.getPropertyValue("transform");
    var rot = getRotationFromMatrix(transform);
    var opacity = cs.getPropertyValue("opacity");

    insAsset.textContent = elementInfo.name || "—";
    insPos.textContent = x + ", " + y;
    insSize.textContent = formatSize(w, h);
    insNatural.textContent = formatSize(naturalW, naturalH);
    insRot.textContent = rot;
    insOpacity.textContent = opacity;

    // Show useful CSS
    var cssOut = "";
    var props = [
      "display",
      "position",
      "box-sizing",
      "border-radius",
      "border",
      "margin",
      "padding",
      "width",
      "height",
      "max-width",
      "background",
      "color",
      "font-size",
      "font-weight",
    ];
    props.forEach(function (p) {
      var value = cs.getPropertyValue(p);
      if (value && value !== "" && value !== "auto" && value !== "normal") {
        cssOut += p + ": " + value + ";\n";
      }
    });
    cssOut += "\ntransform: " + transform + ";\n";
    insCss.textContent = cssOut;

    // Show inspector
    inspector.setAttribute("aria-hidden", "false");
    inspector.classList.add("open");

    // mark selected element
    document.querySelectorAll(".selected-image").forEach(function (el) {
      el.classList.remove("selected-image");
    });
    element.classList.add("selected-image");
  }

  function getElementInfo(element) {
    if (element.tagName === "IMG") {
      return {
        name: element.getAttribute("src") || element.getAttribute("alt") || "—",
        naturalWidth: element.naturalWidth,
        naturalHeight: element.naturalHeight,
      };
    } else {
      var tagName = element.tagName.toLowerCase();
      var className = element.className;
      var textContent = element.textContent
        ? element.textContent.substring(0, 30) +
          (element.textContent.length > 30 ? "..." : "")
        : "";
      return {
        name:
          tagName +
          (className ? "." + className : "") +
          (textContent ? " (" + textContent + ")" : ""),
        naturalWidth: null,
        naturalHeight: null,
      };
    }
  }

  function hideInspector() {
    inspector.setAttribute("aria-hidden", "true");
    inspector.classList.remove("open");
    if (selected) {
      selected.classList.remove("selected-image");
      selected = null;
    }
  }

  // add click listeners to images with class clickable and other elements
  var clickables = document.querySelectorAll(
    "img.clickable, .feature, .btn-primary, .btn-outline, .logo-text"
  );
  clickables.forEach(function (el) {
    el.style.cursor = "pointer";
    el.addEventListener("click", function (ev) {
      ev.stopPropagation();
      showInspectorFor(el);
    });
  });

  // close button
  closeBtn.addEventListener("click", function (ev) {
    ev.stopPropagation();
    hideInspector();
  });

  // click outside to hide
  document.addEventListener("click", function () {
    hideInspector();
  });

  // allow pressing Escape to close
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") hideInspector();
  });
})();
