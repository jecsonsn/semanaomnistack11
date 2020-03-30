const connection = require('../database/connection');
const incidentTable = 'incidents';
const ongTable = 'ongs';
module.exports = {
    
    async index (request, response) {
        const {page = 1} = request.query;
        const [count] = await connection(incidentTable)
        .count();

        const incidents = await connection(incidentTable)
        .join(ongTable, 'ongs.id', '=', incidentTable + '.ong_id')
        .limit(5)
        .offset((page -1) * 5)
        .select([
            incidentTable + '.*', 
            ongTable+'.name',
            ongTable + '.email', 
            ongTable + '.whatsapp', 
            ongTable + '.city',
            ongTable + '.uf'
        ]);

        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents);
    },

    async create(request, response){
        const {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        const [id] = await connection(incidentTable).insert({
            title,
            description,
            value,
            ong_id,
        });

        return response.json({id});
    },

    async delete(request, response){
        const {id} = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection(incidentTable)
        .where('id', id)
        .select('ong_id')
        .first();

        if(incident.ong_id !==   ong_id){
            return response.status(401).json({error: "Operation not permitted."});
        }

        await connection(incidentTable).where('id', id).delete();

        return response.status(204).send();
    }
};