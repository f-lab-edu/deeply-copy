"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var path = require("path");
/**
 * 주어진 디렉토리에서 특정 확장자의 파일을 다른 확장자로 변경하는 함수
 * @param directory - 파일이 있는 디렉토리 경로
 * @param oldExt - 변경할 기존 파일 확장자
 * @param newExt - 변경될 새로운 파일 확장자
 */
function renameFiles(directory, oldExt, newExt) {
    fs.readdir(directory, function (err, files) {
        if (err)
            throw err;
        files.forEach(function (file) {
            if (path.extname(file) === oldExt) {
                var oldPath = path.join(directory, file);
                var newPath_1 = path.join(directory, path.basename(file, oldExt) + newExt);
                fs.rename(oldPath, newPath_1, function (err) {
                    if (err)
                        throw err;
                    console.log("Renamed: ".concat(file, " -> ").concat(path.basename(newPath_1))); // 변경된 파일 로그 출력
                });
            }
        });
    });
}
// dist 디렉토리의 .js 파일을 .cjs 파일로 변경
renameFiles('./build/cjs', '.js', '.cjs');
