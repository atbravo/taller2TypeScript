import { Course } from './course.js';
import  { Informacion } from './informacion.js'
import { dataCourses } from './dataCourses.js';
import { dataInformacion } from './dataInformacion.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let informacionTbody: HTMLElement = document.getElementById('info')!;

const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilerByCredits : HTMLElement = document.getElementById("button-filterByCredit")! ;

const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputMinBox : HTMLInputElement = <HTMLInputElement> document.getElementById("inlineFormInputName")!;
const inputMaxBox : HTMLInputElement = <HTMLInputElement> document.getElementById("inlineFormInputName2")!;

const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

btnfilerByCredits.onclick = () => applyFilterByCredits();
btnfilterByName.onclick = () => applyFilterByName();

renderCoursesInTable(dataCourses);
renderInformationInTable(dataInformacion);

totalCreditElm.innerHTML = `Total creditos ${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}
function renderInformationInTable(informacion: Informacion): void {
  console.log('Desplegando informacion');
  let trElement = document.createElement("tr");
  trElement.innerHTML =  `<td>Codigo</td>
  <td>${informacion.codigo}</td>`;
  informacionTbody.appendChild(trElement);

  trElement = document.createElement("tr");
  trElement.innerHTML =  `<td>Cedula</td>
  <td>${informacion.cedula}</td>`;
  informacionTbody.appendChild(trElement);

  trElement = document.createElement("tr");
  trElement.innerHTML =  `<td>Edad</td>
  <td>${informacion.edad}</td>`;
  informacionTbody.appendChild(trElement);

  trElement = document.createElement("tr");
  trElement.innerHTML =  `<td>Direccion</td>
  <td>${informacion.direccion}</td>`;
  informacionTbody.appendChild(trElement);

  trElement = document.createElement("tr");
  trElement.innerHTML =  `<td>Telefono</td>
  <td>${informacion.codigo}</td>`;
  informacionTbody.appendChild(trElement);
}

 

function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function applyFilterByCredits() { 
  let min = Number(inputMinBox.value);
  let max = Number(inputMaxBox.value);
  min = (min == Number.NaN || min == null) ? 0 : min;
  max = (max == Number.NaN || max == null) ? 15 : max;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByCredits(min,max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByCredits(min: number, max:number , courses: Course[]) {
  let cursos : Course[] =  min == 0 ? dataCourses : courses.filter( c => min <= c.credits );
  cursos =  max == 15 ? cursos : cursos.filter( c => c.credits <= max);
  return cursos;
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}
