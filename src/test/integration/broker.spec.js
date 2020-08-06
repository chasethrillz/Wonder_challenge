import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../../../index';

chai.use(chaiHttp);
chai.should();

describe('INTEGRATION TEST FOR BROKER CONTOLLER', () => {
    describe('/POST MESSAGE ROUTE', () => {
        it('it should successfully add a message to the queue', (done) => {
            chai
                .request(app)
                .post('/api/v1/messages')
                .send({
                    message: "New message to queue"
                })
                .end((err, res) => {
                    res.should.have.status(201);
                    res.body.should.have
                        .property('message')
                        .to.equals(`Message with id 1 successfully added to queue.`);
                    done();
                });
        });
        it('it should successfully update status of a message on the queue', (done) => {
            chai
                .request(app)
                .patch('/api/v1/messages/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have
                        .property('message')
                        .to.equals(`Message processing.`);
                    done();
                });
        });
        it('it should successfully delete a message from the queue', (done) => {
            chai
                .request(app)
                .delete('/api/v1/messages/1')
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.have
                        .property('message')
                        .to.equals(`Message successfully deleted.`);
                    done();
                });
        });
    });
});