Your Task

Core Assignment: D3 Dabbler (Required Assignment)

You need to create a scatter plot between two of the data variables such as Healthcare vs. Poverty or Smokers vs. Age.
Using the D3 techniques we taught you in class, create a scatter plot that represents each state with circle elements. You'll code this graphic in the app.js file of your homework directory—make sure you pull in the data from data.csv by using the d3.csv function. Your scatter plot should ultimately appear like the image at the top of this section.


Include state abbreviations in the circles.


Create and situate your axes and labels to the left and bottom of the chart.


Note: You'll need to use python -m http.server to run the visualization. This will host the page at localhost:8000 in your web browser.




Bonus: Impress the Boss (Optional Assignment)
Why make a static graphic when D3 lets you interact with your data?


1. More Data, More Dynamics
You're going to include more demographics and more risk factors. Place additional labels in your scatter plot and give them click events so that your users can decide which data to display. Animate the transitions for your circles' locations as well as the range of your axes. Do this for two risk factors for each axis. Or, for an extreme challenge, create three for each axis.

Hint: Try binding all of the CSV data to your circles. This will let you easily determine their x or y values when you click the labels.


2. Incorporate d3-tip
While the ticks on the axes allow us to infer approximate values for each circle, it's impossible to determine the true value without adding another layer of data. Enter tooltips: developers can implement these in their D3 graphics to reveal a specific element's data when the user hovers their cursor over the element. Add tooltips to your circles and display each tooltip with the data that the user has selected. Use the d3-tip.js plugin developed by Justin Palmer—we've already included this plugin in your assignment directory.


Check out David Gotz's example to see how you should implement tooltips with d3-tip.