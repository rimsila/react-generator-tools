export default {
  title: '', // <- the name of the big screen
  titleStyle: {}, // <- The style of the big screen name
  gutter: 16, // <- The spacing between each component of the large screen
  layout: [
    {
      name: 'Left', // <- the name of the component to be rendered
      span: 7, // <- left/middle/right layout ratio
      rows: [
        {
          name: 'Row1', // <- the name of the component to be rendered
          height: 1, // <- The proportion of each row height
          cols: [
            {
              name: 'Row1Col1', // <- the name of the component to be rendered
              span: 24, // <- width ratio of each column
              type: 'bar', // <- the type of element in the column (chart, custom, other)
              chartConfig: {},
            },
          ],
        },
        {
          name: 'Row2', // <- the name of the component to be rendered
          height: 1,
          cols: [
            {
              name: 'Row2Col1', // <- the name of the component to be rendered
              span: 24,
              type: 'bar',
              chartConfig: {},
            },
          ],
        },
        {
          name: 'Row3', // <- the name of the component to be rendered
          height: 1,
          cols: [
            {
              name: 'Row3Col1', // <- the name of the component to be rendered
              span: 24,
              type: 'custom', // When customizing, use a div as a placeholder
              chartConfig: {},
            },
          ],
        },
      ],
    },
  ],
};
