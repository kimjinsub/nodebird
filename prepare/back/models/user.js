module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', { // MySQL에서는 users 테이블 생성. 전체소문자+맨뒤s추가
        // id: {},//id가 기본적으로 들어있다. MySQL이 자동으로 번호매김.
        email: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수
            unique: true, //고유한 값
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: false, //필수
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false, //필수

        }
    }, {
        charset: 'utf8',
        collate: 'utf8_general_ci' // 한글 저장
    });

    User.associate = (db) => { };
    return User;
}
//DataTypes
//STRING, TEXT, BOOLEAN, INTEGER, FLOAT, DATETIME