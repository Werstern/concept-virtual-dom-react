"use strict";

var _typeof =
  typeof Symbol === "function" && typeof Symbol.iterator === "symbol"
    ? function(obj) {
        return typeof obj;
      }
    : function(obj) {
        return obj &&
          typeof Symbol === "function" &&
          obj.constructor === Symbol &&
          obj !== Symbol.prototype
          ? "symbol"
          : typeof obj;
      };

/** @jsx createElement */

/*
<ol style="color:red">
  <li>foo</li>
  <li>bar</li>
</ol>
{
  type: 'ol',
  props: {
    style: "color:red"
  },
  children: [
    {
      type: 'li',
      children: ['foo']
    },
    {
      type: 'li',
      children: ['bar']
    }
  ]
}
*/

/*
const list = createElement('ol', {},
  createElement('li', {}, 'foo'),
  createElement('li', {}, 'bar')
);
console.log(list);
*/

function createElement(type, props) {
  for (
    var _len = arguments.length,
      children = Array(_len > 2 ? _len - 2 : 0),
      _key = 2;
    _key < _len;
    _key++
  ) {
    children[_key - 2] = arguments[_key];
  }

  return { type: type, props: props || {}, children: children };
}

function createNode(element) {
  if (typeof element === "string") {
    return document.createTextNode(element);
  } else {
    var node = document.createElement(element.type);
    setProps(node, element.props);

    return node;
  }
}

function setProps(node, props) {
  Object.keys(props).forEach(function(key) {
    return node.setAttribute(key, props[key]);
  });
}

function updateProps(prevProps, nextProps, targetDomNode) {
  Object.keys(prevProps).forEach(function(key) {
    return targetDomNode.removeAttribute(key);
  });

  setProps(targetDomNode, nextProps);
}

function updatePropsDiff(prevProps, nextProps, targetDomNode) {
  Object.keys(prevProps).forEach(function(key) {
    if (!nextProps[key]) {
      return targetDomNode.removeAttribute(key);
    }

    if (prevProps[key] !== nextProps[key]) {
      return targetDomNode.setAttribute(key, nextProps[key]);
    }
  });

  Object.keys(nextProps).forEach(function(key) {
    if (!prevProps[key]) {
      return targetDomNode.setAttribute(key, nextProps[key]);
    }

    if (prevProps[key] !== nextProps[key]) {
      return targetDomNode.setAttribute(key, nextProps[key]);
    }
  });
}

function render(element, targetDomNode) {
  var node = createNode(element);
  targetDomNode.appendChild(node);

  if (typeof element !== "string") {
    element.children.forEach(function(child) {
      return render(child, node);
    });
  }
}

function hasElementChanged(prevElement, nextElement) {
  return (
    (typeof prevElement === "undefined"
      ? "undefined"
      : _typeof(prevElement)) !==
      (typeof nextElement === "undefined"
        ? "undefined"
        : _typeof(nextElement)) ||
    (typeof prevElement === "string" && prevElement !== nextElement) ||
    prevElement.type !== nextElement.type
  );
}

function diff(prevElement, nextElement, targetDomNode) {
  var childIndex =
    arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 0;

  var child = targetDomNode.childNodes[childIndex];

  if (!nextElement) {
    console.log("!nextElement");
    return targetDomNode.removeChild(child);
  }

  if (!prevElement) {
    console.log("!prevElement");
    return render(nextElement, targetDomNode);
  }

  if (hasElementChanged(prevElement, nextElement)) {
    console.log("hasElementChanged");
    return targetDomNode.replaceChild(createNode(nextElement), child);
  }

  if (typeof prevElement !== "string") {
    updatePropsDiff(prevElement.props, nextElement.props, child);

    var maxChildrenLength = Math.max(
      prevElement.children.length,
      nextElement.children.length
    );

    for (var i = 0; i < maxChildrenLength; i++) {
      diff(prevElement.children[i], nextElement.children[i], child, i);
    }
  }
}

var prevList = createElement(
  "ol",
  null,
  createElement("li", { style: "color: blue" }, "foo"),
  createElement("li", { style: "color: red", class: "bold" }, "bar"),
  createElement("li", { style: "color: navy", class: "bold" }, "bar"),
  createElement("li", { style: "color: brown", class: "test" }, "bar"),
  createElement("li", { style: "color: yellow", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: red", class: "bold" }, "bar"),
  createElement("li", { style: "color: green", class: "bold" }, "bar"),
  createElement("li", { style: "color: green", class: "bold" }, "bar")
);

var nextList = createElement(
  "ol",
  null,
  createElement("li", { style: "color: blue" }, "foo"),
  createElement("li", { style: "color: purple", class: "bold" }, "bar"),
  createElement("li", { style: "color: navy", class: "test" }, "bar"),
  createElement("li", { style: "color: brown", class: "test" }, "bar"),
  createElement("li", { style: "color: black", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: white", class: "bold" }, "bar"),
  createElement("li", { style: "color: red", class: "bold" }, "bar"),
  createElement("li", { style: "color: green", class: "bold" }, "bar"),
  createElement("li", { style: "color: green", class: "bold" }, "bar")
);

var rootDomNode = document.getElementById("root");
var updateButton = document.getElementById("update");

render(prevList, rootDomNode);

updateButton.addEventListener("click", function() {
  diff(prevList, nextList, rootDomNode);
});
