import { dataCourses } from './dataCourses.js';
import { dataInformacion } from './dataInformacion.js';
var coursesTbody = document.getElementById('courses');
var informacionTbody = document.getElementById('info');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilerByCredits = document.getElementById("button-filterByCredit");
var inputSearchBox = document.getElementById("search-box");
var inputMinBox = document.getElementById("inlineFormInputName");
var inputMaxBox = document.getElementById("inlineFormInputName2");
var totalCreditElm = document.getElementById("total-credits");
btnfilerByCredits.onclick = function () { return applyFilterByCredits(); };
btnfilterByName.onclick = function () { return applyFilterByName(); };
renderCoursesInTable(dataCourses);
renderInformationInTable(dataInformacion);
totalCreditElm.innerHTML = "Total creditos " + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderInformationInTable(informacion) {
    console.log('Desplegando informacion');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Codigo</td>\n  <td>" + informacion.codigo + "</td>";
    informacionTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Cedula</td>\n  <td>" + informacion.cedula + "</td>";
    informacionTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Edad</td>\n  <td>" + informacion.edad + "</td>";
    informacionTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Direccion</td>\n  <td>" + informacion.direccion + "</td>";
    informacionTbody.appendChild(trElement);
    trElement = document.createElement("tr");
    trElement.innerHTML = "<td>Telefono</td>\n  <td>" + informacion.codigo + "</td>";
    informacionTbody.appendChild(trElement);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function applyFilterByCredits() {
    var min = Number(inputMinBox.value);
    var max = Number(inputMaxBox.value);
    min = (min == Number.NaN || min == null) ? 0 : min;
    max = (max == Number.NaN || max == null) ? 15 : max;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByCredits(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByCredits(min, max, courses) {
    var cursos = min == 0 ? dataCourses : courses.filter(function (c) { return min <= c.credits; });
    cursos = max == 15 ? cursos : cursos.filter(function (c) { return c.credits <= max; });
    return cursos;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
