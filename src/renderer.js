// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.

var edge = require('electron-edge-js');
const path = require("path");
var mposPath = path.join(__dirname, 'sample.dll')
var isConnect = false
// handle button open port click, open modal input port name
document.getElementById('open').addEventListener('click', () => {
    try {
        const helloWorld = edge.func({
            assemblyFile: mposPath,
            typeName: 'sample.Program',
            methodName: 'Hello'
        });
    
        helloWorld({},function (error, result) {
            if (error) {
                console.log('lỗi')
            };
        });
    
        const connect = edge.func({
            assemblyFile: mposPath,
            typeName: 'sample.Program',
            methodName: 'connect'
        });
    
        connect({},function (error, result) {
            if (error) {
                console.error('Lỗi connect:', error);
            };
            if (result !== 0) {
                isConnect = true
                console.log("Kết nối với thiết bị thành công")
            } else {
                console.log("Không tìm thấy thiết bị")
            }
        });
    } catch (error) {
        console.log('error')
    }
})

document.getElementById('write').addEventListener('click', () => {
    if(isConnect) {
        try {
            const showQR = edge.func({
                assemblyFile: mposPath,
                typeName: 'sample.Program',
                methodName: 'showQR'
            });
            let data = "00020101021138500010A0000007270120000697041601066722760208QRIBFTTA5303704540410005802VN62080804GUTA6304BC01,500.000,Guta Cafe"
            // let data = {
            //     qrCode: "00020101021",
            //     price: "500.000",
            //     name: "Guta Cafe"
            // }
            let showQRFn = function() {
                showQR(data, function(error, result) {
                    if (error) {
                        console.error('Lỗi showQR:', error);
                        return;
                    }
                    if (result !== 0) {
                        showQRFn()
                    } else {
                        console.log("Tạo mã QR thành công")
                    }
                    
                })
            }
            showQRFn()
        } catch (error) {
            console.log('error')
        }
    } else {
        console.log("Hãy kết nối với thiết bị")
    }
})
    
document.getElementById('clear').addEventListener('click', () => {
    if(isConnect) {
        const reset = edge.func({
            assemblyFile: mposPath,
            typeName: 'sample.Program',
            methodName: 'reset'
        });
    
        reset({},function (error, result) {
            if (error) throw error;
            console.log("Đã clear QR")
        });
    } else {
        console.log("Hãy kết nối với thiết bị")
    }
})