const solveQuadraticEquation = (a, b, c) => {
  const delta = b * b - 4 * a * c;
  let results;

  if (a === 0) {
    if (b === 0) return c === 0;
    else results = [-c / b];
  } else if (delta >= 0) {
    const x1 = (-b + Math.sqrt(delta)) / (2 * a);
    const x2 = (-b - Math.sqrt(delta)) / (2 * a);
    results = [x1, x2];
  } else return false;

  return results;
};

const findTrianglePoints = (w1, w2, w3) => {
  const pointA = [0, 0];
  const pointB = [w1, 0];
  const pointC = [];

  const vectorAC = `x^2 + y^2 = ${w2 * w2} => y^2 = ${w2 * w2} - x^2`;
  const vectorBC = `x^2 - ${2 * w1}x + ${w1 * w1} + y^2 = ${w3 * w3} => x^2 - ${2 * w1}x + ${w1 * w1} + ${
    w2 * w2
  } - x^2 = ${w3 * w3}`;
  console.log(`Equation of vector AC: ${vectorAC}`);
  console.log(`Equation of vector BC: ${vectorBC}`);

  const equation = `${w1 * w1 + w2 * w2 - w3 * w3} = ${2 * w1}x`;
  console.log(`Equation of vector AC intersect BC: ${equation}`);

  const XAxisC = (w1 * w1 + w2 * w2 - w3 * w3) / (2 * w1);
  pointC.push(XAxisC);

  const equationAC = `${XAxisC * XAxisC} + y^2 = ${w2 * w2} => y^2 = ${w2 * w2 - XAxisC * XAxisC}`;
  console.log(`Equation of vector AC when x axis = ${XAxisC}: ${equationAC}`);

  const YAxisCResults = solveQuadraticEquation(1, 0, XAxisC * XAxisC - w2 * w2);
  if (typeof YAxisCResults !== 'boolean' && YAxisCResults.length) {
    pointC.push(YAxisCResults[1]);

    return { pointA, pointB, pointC };
  }
};

const drawTriangle = (triangle) => {
  const canvas = document.querySelector('#myCanvas');
  const context = canvas.getContext('2d');

  const { pointB, pointC } = triangle;

  context.clearRect(0, 0, canvas.width, canvas.height);

  // the triangle
  context.beginPath();
  context.moveTo(500, 500);
  context.lineTo(pointB[0] * 100 + 500, 500);
  context.lineTo(pointC[0] * 100 + 500, pointC[1] * 100 + 500);
  context.closePath();

  // the outline
  context.lineWidth = 10;
  context.strokeStyle = '#666666';
  context.stroke();

  // the fill color
  context.fillStyle = '#FFCC00';
  context.fill();
};

window.addEventListener('load', function () {
  //everything is fully loaded, don't use me if you can use DOMContentLoaded
  document.getElementById('draw').addEventListener('click', () => {
    const w1 = this.document.getElementById('width1').value;
    const w2 = this.document.getElementById('width2').value;
    const w3 = this.document.getElementById('width3').value;

    if (w1 > 0 && w2 > 0 && w3 > 0) {
      const triangle = findTrianglePoints(w1, w2, w3);
      if (triangle) {
        drawTriangle(triangle);
      }
    } else {
      alert('Độ dài các cạnh phải lớn hơn 0');
    }
  });
});
