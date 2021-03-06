import { dbContext } from "../db/DbContext"
import { BadRequest } from "../utils/Errors"

class BugService {

    async find(query = {}) {
        let bugs = await dbContext.Bugs.find(query).populate("creator", "name picture")
        return bugs
    }
    async getById(id) {
        let data = await dbContext.Bugs.findOne({ _id: id })
        if (!data) {
            throw new BadRequest("Youre in the wrong neck of the woods!")
        }
        return data
    }
    async create(rawData) {
        let data = await dbContext.Bugs.create(rawData)
        return data
    }
    async edit(id, userEmail, update) {
        let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, update, { new: true })
        if (!data) {
            throw new BadRequest("Youre in the wrong neck of the woods!")
        }
        return data
    }

    async delete(id, userEmail) {
        let data = await dbContext.Bugs.findOneAndUpdate({ _id: id, creatorEmail: userEmail }, { closed: true }, { new: true })
        if (!data) {
            throw new BadRequest("Youre in the wrong neck of the woods!")
        }

    }

}
export const bugService = new BugService()