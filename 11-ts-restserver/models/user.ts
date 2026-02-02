import { DataTypes } from 'sequelize';
import db from '../db/connection';


//modelo usuario con typescript
const User = db.define('User', {
    name: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING
    },
    state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

});


export default User;