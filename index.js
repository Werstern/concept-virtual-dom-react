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
  return { type, props: props || {}, children };
}

function createNode(element) {
	if (typeof element === 'string') {
  	return document.createTextNode(element);
  } else {
  	const node = document.createElement(element.type);
    setProps(node, element.props);

    return node;
  }
}

function setProps(node, props) {
	Object.keys(props).forEach(key =>
  	node.setAttribute(key, props[key])
  );
}

function updateProps(prevProps, nextProps, targetDomNode) {
	Object.keys(prevProps).forEach(key =>
  	targetDomNode.removeAttribute(key)
  );

  setProps(targetDomNode, nextProps);
}

function updatePropsDiff(prevProps, nextProps, targetDomNode) {

  Object.keys(prevProps).forEach(key => {
  	if (!nextProps[key]) {
    	return targetDomNode.removeAttribute(key);
    }

  	if (prevProps[key] !== nextProps[key]) {
    	return targetDomNode.setAttribute(key, nextProps[key]);
    }
  });

    Object.keys(nextProps).forEach(key => {
  	if (!prevProps[key]) {
    	return targetDomNode.setAttribute(key, nextProps[key]);
    }

  	if (prevProps[key] !== nextProps[key]) {
    	return targetDomNode.setAttribute(key, nextProps[key])
    }
  });
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
  	updatePropsDiff(prevElement.props, nextElement.props, child);

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

const prevList = (
	<ol>
    <li style="color: blue">foo</li>
    <li style="color: red" class="bold">bar</li>
    <li style="color: navy" class="bold">bar</li>
    <li style="color: brown" class="test">bar</li>
    <li style="color: yellow" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: red" class="bold">bar</li>
    <li style="color: green" class="bold">bar</li>
    <li style="color: green" class="bold">bar</li>
  </ol>
);

const nextList = (
	<ol>
    <li style="color: blue">foo</li>
    <li style="color: purple" class="bold">bar</li>
    <li style="color: navy" class="test">bar</li>
    <li style="color: brown" class="test">bar</li>
    <li style="color: black" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: white" class="bold">bar</li>
    <li style="color: red" class="bold">bar</li>
    <li style="color: green" class="bold">bar</li>
    <li style="color: green" class="bold">bar</li>
  </ol>
);

const rootDomNode = document.getElementById("root");
const updateButton = document.getElementById("update");

render(
	prevList,
  rootDomNode
);

updateButton.addEventListener('click', () => {
	diff(
    prevList,
    nextList,
    rootDomNode
  )
});
