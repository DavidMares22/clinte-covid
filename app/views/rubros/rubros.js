const fromObject = require("tns-core-modules/data/observable").fromObject;
const ObservableArray = require("tns-core-modules/data/observable-array")
  .ObservableArray;
var httpModule = require("tns-core-modules/http");
var Dialogs = require("ui/dialogs");

let page;

var obj = fromObject({
  taskList: new ObservableArray([]),
  busy: true,
});

exports.onPageLoaded = function (args) {
  page = args.object;
  page.bindingContext = obj;

  while (obj.taskList.length) {
    obj.taskList.pop();
  }

  obtenerDatos();
};

function onItemTap(args) {
  const index = args.index;
  console.log(obj.taskList.getItem(index));

//   alert(`ListView item tap ${obj.taskList.getItem(index)}`);
}
exports.onItemTap = onItemTap;

function obtenerDatos() {
  obj.set("busy", true);

  httpModule
    .request({
      url: "http://192.168.1.67:5000/rubro",
      method: "POST",
      headers: { "Content-Type": "application/json" },
      //   content: JSON.stringify({}),
    })
    .then((response) => {
      return JSON.parse(response.content);
    })
    .then((data) => {
      data["rubro:"].forEach((task) => {
        // console.log(task.decription);
        obj.taskList.push({
          title: task.decription,
          id: task.id,
        });
      });

      obj.set("busy", false);
    })
    .catch((e) => {
      // alert(e)
      Dialogs.alert({
        title: "Error de conexion",
        message: "Por favor, intente acceder al historial de nuevo más tarde.",
        okButtonText: "Ok",
      }).then(function () {
        // console.log("Dialog closed!");
      });
    });
}

exports.backHome = function () {
  page.frame.goBack();
};
