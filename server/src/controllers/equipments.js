import { assoc, equals, isNil } from 'ramda'

export default class EquipmentsController {

    constructor(Equipment, Place, Responsible) {
        this.Equipment = Equipment;
        this.Place = Place;
        this.Responsible = Responsible;
    }

    findAll(req, res, next) {
        this.Equipment.findAll({
            attributes:{ exclude: ['created_at', 'updated_at', 'deleted_at'] },
            include: [{ all: true, nested: true }]
            // include: [{
            //     model: this.Place,
            //     as: 'place'
            // }]
          })
            .then(equipments => res.send(equipments))
            .catch(err => next(assoc('status', 400, err)));
    }

    findOne(req, res, next) {
        this.Equipment.findById(req.params.id, {
            attributes : { exclude: ['created_at', 'updated_at', 'deleted_at'] }
        })
            .then(equipment => {
                isNil(equipment) ? next() : res.send(equipment);
            })
            .catch(err => next(assoc('status', 400, err)));
    }

    save(req, res, next) {
        this.Equipment.create(req.body)
            .then(equipment => res.send(equipment))
            .catch(err => next(assoc('status', 400, err)));
    }

    update(req, res, next) {
        this.Equipment.update(req.body, {
            where: {
              id: req.params.id
            }
          })
            .then(rowsAffected => {
              equals(rowsAffected[0], 0) ? next() : res.sendStatus(200);
            })
            .catch(err => next(assoc('status', 400, err)))
    }

    delete(req, res, next) {
        this.Equipment.destroy({
          where: {
            id: req.params.id
          }
        })
          .then(rowsAffected => {
            equals(rowsAffected, 0) ? next() : res.sendStatus(204);
        })
        .catch(err => next(assoc('status', 400, err)))
    }

}