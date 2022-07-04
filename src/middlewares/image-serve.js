import {body} from 'express-validator';
import multer from 'multer';

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, __dirname + '/../views/uploads');
  },
  filename: function(req, file, cb) {
    const imageName = new Date().valueOf() + '_' + req.body.name + '_' + file.fieldname + '_' + file.originalname;
    if (file.fieldname === 'image') {
      req.body.image = `http://kdt-sw2-seoul-team02.elicecoding.com/uploads/${imageName}`;
    } else {
      req.body.detailImage = `http://kdt-sw2-seoul-team02.elicecoding.com/uploads/${imageName}`;
    }
    cb(null, imageName);
  },
});

const upload = multer({storage: storage});

export {upload};
