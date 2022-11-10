/* eslint-disable @typescript-eslint/no-unsafe-return */
import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin'
import { Farm } from './models/Farm';

admin.initializeApp()

const firestore = admin.firestore()

export const saveFarm = functions.https.onRequest(async (request, response) => {
    try {
        const farm: Partial<Farm> = request.body
        functions.logger.info(JSON.stringify(farm))
        
        if(farm.farmId){
            await firestore.doc(`farm/${farm.farmId}`).set(farm)
            response.status(200).json({msg: 'Fazenda salva com sucesso!', data: farm})
        } else{
            const farmRef = firestore.collection(`farm`).doc()
            farm.farmId = farmRef.id
            await farmRef.set(farm)
            response.status(200).json({msg: 'Fazenda salva com sucesso!', data: farm})
        }
    } catch (error) {
        functions.logger.error(error)
        functions.logger.info(JSON.stringify(error))
        response.status(400).json({ error: JSON.stringify(error), msg: "Erro ao salvar fazenda"})
    }
});

export const getFarm = functions.https.onRequest(async (request, response) => {
    try {
        const farmId = request.query.farmId
        functions.logger.info(farmId)

        if(typeof farmId === 'string'){
            const farm = (await firestore.doc(`farm/${farmId}`).get()).data()
            
            if(!farm){
                response.status(404).json({msg: 'Fazenda não encontrada'})
            } else{
                response.status(200).json({msg: "Fazenda encontrada", data: farm})
            }
        } else{
            response.status(404).json({msg: 'Fazenda não encontrada'})
        }
    } catch (error) {
        functions.logger.error(error)
        functions.logger.info(JSON.stringify(error))
        response.status(404).json({ error: JSON.stringify(error), msg: "Fazenda não encontrada"})
    }
});

export const fetchAll = functions.https.onRequest(async (request, response) => {
    try {
        const farmsDocs = await firestore.collection('farm').get()
        const farms: Farm[] = []

        for (const doc of farmsDocs.docs) {
            farms.push(doc.data() as Farm)
        }
        
        if(farms.length == 0) {
            response.status(404).json({msg: 'Nenhuma fazenda encontrada'})
        } else{
            response.status(200).json({msg: `${farms.length} fazendas encontradas`, data: farms})
        }
    } catch (error) {
        functions.logger.error(error)
        functions.logger.info(JSON.stringify(error))
        response.status(404).json({ error: JSON.stringify(error), msg: "Nenhuma fazenda encontrada"})
    }
});
