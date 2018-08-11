module.exports = {
    database: 'mongodb://localhost:27017',
    jwt: {
        jwtSecret: "MyS3cr3tK3Y",
        jwtSession: {
            session: false
        }
    }
}