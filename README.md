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
