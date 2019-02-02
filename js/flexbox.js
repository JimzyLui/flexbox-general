const createBreak = () => {
  const br = document.createElement("br");
  return br;
};

/* correct the missing dashes */
const correctSpelling = str => {
  if (!str) return "";
  //console.log('------->',str);
  const strNew = Object.entries(objFlexProperties.spelling)
    .filter(x => x[0] === str)
    .pop();
  //console.log(strNew);
  //console.log(typeof strNew);
  //console.log('isarray()', Array.isArray(strNew));
  //console.log(strNew[0]);
  if (Array.isArray(strNew)) {
    return strNew[1];
  } else {
    return str;
  }
};

/* create the test boxes with the changes */
const createTest = (o, objChanges) => {
  const div = document.createElement("div");
  div.id = o.id;
  // create the headings
  const div1 = document.createElement("div");
  div1.className = "subtitle";
  const spanDisplay = document.createElement("span");
  spanDisplay.className = "title";
  spanDisplay.innerHTML = "display: ";
  div1.appendChild(spanDisplay);
  const spanFlex = document.createElement("span");
  spanFlex.className = "text";
  spanFlex.innerHTML = "flex;";
  div1.appendChild(spanFlex);
  div.appendChild(div1);

  const div2 = document.createElement("div");
  div2.className = "subtitle";
  const spanFlow = document.createElement("span");
  spanFlow.className = "title";
  spanFlow.innerHTML = "flex-flow: ";
  div2.appendChild(spanFlow);
  const spanFlowVal = document.createElement("span");
  spanFlowVal.className = "text";
  spanFlowVal.innerHTML = o.ff;
  div2.appendChild(spanFlowVal);
  div.appendChild(div2);

  // create the test area
  const divTest = document.createElement("div");
  divTest.id = o.ff
    .split(" ")
    .map(x => x[0])
    .join("");
  divTest.classList = o.ff.substring(0, 3);

  Object.entries(objChanges).forEach(x => {
    console.log("--->");
    //console.log("x: ", x);
    //console.log(x[0], x[1]);
    const key1 = x[0].replace("-", "");
    const key2 = x[1].replace("-", "");
    //console.log("key1", key1);
    if (objFlexProperties[key1]) {
      //console.log(objFlexProperties[key1]);
      console.log("key", x);
      const val = Object.entries(objFlexProperties[key1]).filter(
        t => t[0] == key2
      )[0][1];
      console.log("val", val);
      divTest.classList += " " + val;
    }
  });

  /* make five numbered generic boxes as the container items */
  [...Array(5)].forEach((x, idx) => {
    const d = document.createElement("div");
    d.className = "box";
    d.innerHTML = idx + 1;
    divTest.appendChild(d);
  });

  div.appendChild(divTest);
  return div;
};

/* create the Test Group, passing in the changes 
   use the changes as the labels
*/
const createTestGroup = objChanges => {
  const divTestGroup = document.createElement("div");
  divTestGroup.className = "testGroup";
  arrTests.forEach(o => {
    const div = createTest(o, objChanges);
    divTestGroup.appendChild(div);
  });
  const divTestGroupWrapper = document.createElement("div");
  const testGroupTitle = document.createElement("div");
  testGroupTitle.innerHTML = Object.entries(objChanges).reduce(
    (acc, cur) => (acc += "<br>" + correctSpelling(cur[0]) + ": " + cur[1]),
    ""
  );
  divTestGroupWrapper.appendChild(testGroupTitle);
  divTestGroupWrapper.appendChild(divTestGroup);
  return divTestGroupWrapper;
};

/* the four basid groups */
const arrTests = [
  {
    id: "col1",
    ff: "column wrap"
  },
  {
    id: "col2",
    ff: "column nowrap"
  },
  {
    id: "row1",
    ff: "row wrap"
  },
  {
    id: "row2",
    ff: "row nowrap"
  }
];
const objTests = {
  column: [
    "Columns",
    {
      id: "col1",
      ff: "column wrap"
    },
    {
      id: "col2",
      ff: "column nowrap"
    }
  ],
  row: [
    "Rows",
    {
      id: "row1",
      ff: "row wrap"
    },
    {
      id: "row2",
      ff: "row nowrap"
    }
  ]
};

/* most of the flex container properties (and a few item props) */
const objFlexProperties = {
  justifycontent: {
    flexstart: "jc-flex-start",
    flexend: "jc-flex-end",
    center: "jc-center",
    spacebetween: "jc-space-between",
    spacearound: "jc-space-around",
    spaceevenly: "jc-space-evenly"
  },
  alignitems: {
    flexstart: "ai-flex-start",
    flexend: "ai-flex-end",
    center: "ai-center",
    stretch: "ai-stretch",
    baseline: "ai-baseline"
  },
  aligncontent: {
    flexstart: "ac-flex-start",
    flexend: "ac-flex-end",
    center: "ac-center",
    stretch: "ac-stretch",
    spacebetween: "ac-space-between",
    spacearound: "ac-space-around"
  },
  spelling: {
    justifycontent: "justify-content",
    alignitems: "align-items",
    aligncontent: "align-content",
    flexstart: "flex-start",
    flexend: "flex-end",
    spacebetween: "space-between",
    spacearound: "space-around",
    spaceevenly: "space-evenly"
  }
};

/* run the test*/
const runTest = o => {
  const testGroup = createTestGroup(o);
  divMain.appendChild(testGroup);
  divMain.appendChild(createBreak());
};
const divMain = document.getElementById("main");

let objChanges = { Baseline: "no extra settings" };
runTest(objChanges);

objChanges = { justifycontent: "center" };
runTest(objChanges);

objChanges = { alignitems: "center" };
runTest(objChanges);

objChanges = { aligncontent: "center" };
runTest(objChanges);

objChanges = {
  justifycontent: "center",
  alignitems: "center"
};
runTest(objChanges);

objChanges = {
  justifycontent: "center",
  aligncontent: "center"
};
runTest(objChanges);
objChanges = {
  aligncontent: "center",
  alignitems: "center"
};
runTest(objChanges);
objChanges = {
  justifycontent: "center",
  aligncontent: "center",
  alignitems: "center"
};
runTest(objChanges);
