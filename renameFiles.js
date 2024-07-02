import fs from 'fs';
import path from 'path';

function renameFiles(directory, oldExt, newExt) {
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
          console.log(`Renamed: ${file} -> ${path.basename(newPath)}`);
        });
      }
    });
  });
}

renameFiles('./build/cjs', '.js', '.cjs');
