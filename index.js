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

function createNode(element) {
	if (typeof element === 'string') {
  	return document.createTextNode(element);
  } else {
  	return document.createElement(element.type);
  }
}

function render(element, targetDomNode) {

	const node = createNode(element);
  targetDomNode.appendChild(node);

  if (typeof element !== 'string') {
  	element.children.forEach(child => render(child, node));
  }
}

function hasElementChanged(prevElement, nextElement) {
	return (
  	typeof prevElement !== typeof nextElement
		|| (
    	typeof prevElement === 'string'
      && prevElement !== nextElement
    )
    || prevElement.type !== nextElement.type
  );
}

function diff(prevElement, nextElement, targetDomNode, childIndex = 0) {
	const child = targetDomNode.childNodes[childIndex];

  console.log(
  	prevElement,
  	nextElement,
    targetDomNode,
    child,
    childIndex
  );

	if (!nextElement) {
  	console.log('!nextElement');
  	return targetDomNode.removeChild(child);
  }

  if (!prevElement) {
  	console.log('!prevElement');
  	return render(nextElement, targetDomNode);
  }

  if (hasElementChanged(prevElement, nextElement)) {
  	console.log('hasElementChanged');
    return targetDomNode.replaceChild(createNode(nextElement), child);
  }

  if (typeof prevElement !== 'string') {
  	const maxChildrenLength = Math.max(prevElement.children.length, nextElement.children.length);

    for (let i = 0; i < maxChildrenLength; i++) {
      diff(
        prevElement.children[i],
        nextElement.children[i],
        child,
        i
      );
    }
  }
}

const listWithJSX = (
	<ol>
    <li>foo </li>
    <li>bar</li>
  </ol>
);

const listWithJSX2 = (
	<ol>
    <li>foosss <button>hi</button></li>
  </ol>
);

const rootDomNode = document.getElementById("root");
const updateButton = document.getElementById("update");

render(
	listWithJSX,
  rootDomNode
);

updateButton.addEventListener('click', () => {
	diff(
  listWithJSX,
  listWithJSX2,
  rootDomNode
  )
});
