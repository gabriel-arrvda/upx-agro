import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { Farm } from './models/Farm';

admin.initializeApp()

const firestore = admin.firestore()

export const saveFarm = functions.https.onRequest(async (request, response) => {
    try {
        const farm: Partial<Farm> = request.body
        farm.placedObjects?.map(po => po.fromJson())
        
        if(farm.farmId){
            await firestore.doc(`farm/${farm.farmId}`).set(farm)
            farm.placedObjects?.map(po => po.toJson())
            response.status(200).json({msg: 'Fazenda salva com sucesso!', data: farm})
        } else{
            const farmRef = firestore.collection(`farm`).doc()
            farm.farmId = farmRef.id
            await farmRef.set(farm)
            farm.placedObjects?.map(po => po.toJson())
            response.status(200).json({msg: 'Fazenda salva com sucesso!', data: farm})
        }
    } catch (error) {
        functions.logger.error(error)
        functions.logger.info(JSON.stringify(error))
        response.status(400).json({ error: error, msg: "Erro ao salvar fazenda"})
    }
});

export const getFarm = functions.https.onRequest(async (request, response) => {
    try {
        const farmId = request.params.farmId
        const farm = (await firestore.doc(`farmId/${farmId}`).get()).data()
        response.status(200).json({msg: "Fazenda encontrada", data: farm})
    } catch (error) {
        functions.logger.error(error)
        functions.logger.info(JSON.stringify(error))
        response.status(404).json({ error: error, msg: "Fazenda não encontrada"})
    }
});
