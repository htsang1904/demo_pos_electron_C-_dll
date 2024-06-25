// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var edge = require('electron-edge-js');
var path = "./sample.dll"

// handle button open port click, open modal input port name
document.getElementById('open').addEventListener('click', () => {
    const helloWorld = edge.func({
        assemblyFile: path,
        typeName: 'sample.Program',
        methodName: 'Hello'
    });

    helloWorld({},function (error, result) {
        if (error) throw error;
        console.log(result);
    });

    const connect = edge.func({
        assemblyFile: path,
        typeName: 'sample.Program',
        methodName: 'connect'
    });

    connect({},function (error, result) {
        if (error) throw error;
        console.log(result);
    });
})

document.getElementById('write').addEventListener('click', () => {
    const showQR = edge.func({
        assemblyFile: path,
        typeName: 'sample.Program',
        methodName: 'showQR'
    });

    let data = {
        qrCode: "00020101021238560010A0000007270126000697041501121280001129930208QRIBFTTA530370454065000005802VN62310105313640818 BN 31364 tam ung.630435C0",
        price: "500.000",
        name: "Guta Cafe"
    }
    showQR(data,function (error, result) {
        if (error) throw error;
        console.log(result);
    });
})
    
document.getElementById('clear').addEventListener('click', () => {
    const reset = edge.func({
        assemblyFile: path,
        typeName: 'sample.Program',
        methodName: 'reset'
    });

    reset({},function (error, result) {
        if (error) throw error;
        console.log(result);
    });
})