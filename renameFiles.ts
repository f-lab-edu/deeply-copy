import * as fs from 'fs';
import * as path from 'path';

/**
 * 주어진 디렉토리에서 특정 확장자의 파일을 다른 확장자로 변경하는 함수
 * @param directory - 파일이 있는 디렉토리 경로
 * @param oldExt - 변경할 기존 파일 확장자
 * @param newExt - 변경될 새로운 파일 확장자
 */
function renameFiles(directory: string, oldExt: string, newExt: string): void {
  fs.readdir(directory, (err, files) => {
    if (err) throw err;

    files.forEach((file) => {
      if (path.extname(file) === oldExt) {
        const oldPath = path.join(directory, file);
        const newPath = path.join(
          directory,
          path.basename(file, oldExt) + newExt,
        );
        fs.rename(oldPath, newPath, (err) => {
          if (err) throw err;
          console.log(`Renamed: ${file} -> ${path.basename(newPath)}`); // 변경된 파일 로그 출력
        });
      }
    });
  });
}

// dist 디렉토리의 .js 파일을 .cjs 파일로 변경
renameFiles('./build/cjs', '.js', '.cjs');
