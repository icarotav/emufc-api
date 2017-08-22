import db from '../../../models'
import { dissoc, empty, assoc } from 'ramda'
const {user: User} = db;

describe('Routes: User', () => {

    const fakeUser = {
        username: "icaropinho",
        email: "icaropinhoe@gmail.com",
        password: "123456",
        access_token: "asdasdad"
    }

    const fakeUserWithInvalidEmail = {
        username: "josiaswando",
        email: "josias",
        password: "123456",
        access_token: "asdasdad"
    }

    const fakeUsers = [
        {
            username: "icarotavares",
            email: "icarotavares@live.com",
            password: "123456",
            access_token: "asdasdad"
        },
        {
            username: "andersonalmada",
            email: "almada@gmail.com",
            password: "123456",
            access_token: "asdasdad"
        }
    ]

    beforeEach(done => {
        User.sync({force: true})
            .then(() => User.bulkCreate(fakeUsers))
            .then(users => {
                done();
            })
            .catch(err => {
                done(err);
            });
    });

    describe('# GET /users', () => {
        it('should return a list of users', done => {
            request.get("/users")
                .expect(200)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body).to.have.length(2);
                    expect(res.body[0].username).to.eql(fakeUsers[0].username);
                    expect(res.body[0]).to.not.have.property('created_at');
                    expect(res.body[0]).to.not.have.property('updated_at');
                    expect(res.body[0]).to.not.have.property('deleted_at');

                    expect(res.body[1].username).to.eql(fakeUsers[1].username);

                    done(err);
                });
        })
    });

    describe('# POST /users', () => {
        it('should create a new user', done => {
            request.post('/users')
                .send(fakeUser)
                .expect(201)
                .expect('Content-Type', /json/)
                .end((err, res) => {
                    expect(res.body.username).to.eql(fakeUser.username);
                    expect(res.body.email).to.eql(fakeUser.email);
                    done(err);
                });
        });

        it("shouldn't create a new user with invalid email", done => {
            request.post('/users')
                .send(fakeUserWithInvalidEmail)
                .expect(400, done);
        });

        it("shouldn't create a new user with duplicated email", done => {
            request.post('/users')
                .send(fakeUsers[0])
                .expect(400, done);
        });

        it("shouldn't create a new user without email", done => {
            request.post('/users')
                .send(dissoc('email', fakeUser))
                .expect(400, done);
        });

        it("shouldn't create a new user with empty email", done => {
            request.post('/users')
            .send(assoc('email', empty(fakeUser.email), fakeUser))
                .expect(400, done);
        });
    });

    describe('# PUT /users/{id}', () => {
        it('should update a user', done => {
            request.put('/users/1')
                .send(fakeUser)
                .expect(200, done);
        });

        it("souldn't update with invalid e-mail", done => {
            request.put('/users/1')
                .send(fakeUserWithInvalidEmail)
                .expect(400, done);
        })

        it("shouldn't update with duplicated email", done => {
            request.put('/users/2')
                .send(fakeUsers[0])
                .expect(400, done);
        });

        it("shouldn't update with empty email", done => {
            request.put('/users/1')
                .send(assoc('email', empty(fakeUser.email), fakeUser))
                .expect(400, done);
        });
    });
});