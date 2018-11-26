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

function createElement(type, props, ...children) {
  return { type, props, children };
}

function renderNode(type, targetDomNode) {
	const node = document.createElement(type);
	targetDomNode.appendChild(node);

  return node;
}

function renderTextNode(text, targetDomNode) {
	const textNode = document.createTextNode(text);
    targetDomNode.appendChild(textNode);

    return textNode;
}

function render(element, targetDomNode) {
	if (typeof element === 'string') {
    return renderTextNode(element, targetDomNode);
  }

	const node = renderNode(element.type, targetDomNode)
  element.children.forEach(child => render(child, node));
}

const listWithJSX = (
	<ol>
    <li>foo <b>and</b> bar <br /> ho</li>
    <li>hello <button>click me</button></li>
  </ol>
);

render(
	listWithJSX,
  document.getElementById("root")
);
