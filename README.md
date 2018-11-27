We can represent Html like this or some other nested html elements as an object with a type in which we can store the type of the element, properties in which we can store some properties such as styles and etc., and child nested structures.

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

update 1: A simple example of creating a virtual DOM tree without props.
Before use this example you should read this https://babeljs.io/docs/en/babel-plugin-transform-react-jsx/
It recompiles the script with jsx syntax into normal js, which browsers could read

update 2: Added re rendering element when the virtual DOM tree has changed (without props).
