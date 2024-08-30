import express from 'express';
import { CountryOptions, listAll, PestGraph, PestOptions, RegionOptions, SectorOptions, SourceOptions, Summary, TopCountry, TopicsOptions, Yearly } from '../Controller/controller.js';

const route = express.Router()

route.get('/summary',Summary)
route.get('/Yearly',Yearly)
route.get('/sector',SectorOptions)
route.get('/topic',TopicsOptions)
route.get('/region',RegionOptions)
route.get('/pest',PestOptions)
route.get('/source',SourceOptions)
route.get('/country',CountryOptions)

route.get('/top-country',TopCountry)
route.get('/list',listAll)
route.get('/pestle',PestGraph)





export default route;