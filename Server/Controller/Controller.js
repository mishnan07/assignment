import Datas from "../Models/model.js";
import moment from 'moment'
import { count } from "./energyController.js";

export const Summary = async (req, res) => {
    try {
      const data = await Datas.aggregate([
        {
          $group: {
            _id: null,
            totalIntensity: { $sum: "$intensity" },
            totalLikelihood: { $sum: "$likelihood" },
            totalRelevance: { $sum: "$relevance" },
            totalCountries: { $addToSet: "$country" } // Array of unique countries
          }
        },
        {
          $project: {
            _id: 0,
            totalIntensity: 1,
            totalLikelihood: 1,
            totalRelevance: 1,
            totalCountries: { $size: "$totalCountries" } // Count of unique countries
          }
        }
      ]);

      
  
      if (data.length > 0) {
        res.status(200).json(data[0]); // Return the first (and only) element in the data array
      } else {
        res.status(200).json({
          totalIntensity: 0,
          totalLikelihood: 0,
          totalRelevance: 0,
          totalCountries: 0,
        });
      }
    } catch (error) {
      console.error('Error fetching data: ', error.message);
      res.status(500).json({ message: 'Server Error' });
    }
  };


export const Yearly = async (req, res) => {
  try {
      let { startDate, endDate ,sector,topic ,region} = req?.query;

 

      startDate = parseInt(moment(startDate).format('YYYY'), 10);
      endDate = parseInt(moment(endDate).format('YYYY'), 10);

      let match = {
        end_year: {
            $gte: startDate,
            $lte: endDate
        }
    }

    

    const isNull = (value)=>{
      if(value == "" || value == undefined || value == null ){
        return true
      }
      return false
    }

    if(!isNull(sector)){
      match.sector = sector
    }
    if(!isNull(topic)){
      match.topic = topic
    }
    if(!isNull(region)){
      match.region = region
    }


      const data = await Datas.aggregate([
          {
              $match: match
          },
          {
              $group: {
                  _id: "$end_year",
                  totalIntensity: { $sum: "$intensity" },
                  totalLikelihood: { $sum: "$likelihood" },
                  totalRelevance: { $sum: "$relevance" }
              }
          },
          {
              $sort: { "_id": 1 } // Sort by year in ascending order
          },
          {
              $project: {
                  _id: 0,
                  year: "$_id",
                  totalIntensity: 1,
                  totalLikelihood: 1,
                  totalRelevance: 1
              }
          },
          {
              $group: {
                  _id: null,
                  totalIntensity: { $push: "$totalIntensity" },
                  totalLikelihood: { $push: "$totalLikelihood" },
                  totalRelevance: { $push: "$totalRelevance" },
                  year: { $push: "$year" }
              }
          }
      ]);

      res.status(200).json({ data });
  } catch (error) {
      console.error('Error fetching data: ', error.message);
      res.status(500).json({ message: 'Server Error' });
  }
};


export const TopicsOptions = async (req, res) => {
  try {
    const data = await Datas.aggregate([
      {
        $match: {
            topic: { $nin: ["", undefined, null, []] }
        }
    },
       
      {
        $group: {
          _id: '$topic',
          name: { $first: "$topic" },
        }
      },
    ]);

    
    res.status(200).json({data}); 

  } catch (error) {
    console.error('Error fetching data: ', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};



export const SectorOptions = async (req, res) => {
  try {
    const data = await Datas.aggregate([
      {
        $match: {
            sector: { $nin: ["", undefined, null, []] }
        }
    },    
      {
        $group: {
          _id: '$sector',
          name: { $first: "$sector" },
        }
      },
    ]);

    
    res.status(200).json({data}); 

  } catch (error) {
    console.error('Error fetching data: ', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const RegionOptions = async (req, res) => {
  try {
    const data = await Datas.aggregate([
      {
        $match: {
          region: { $nin: ["", undefined, null, []] }
        }
    },    
      {
        $group: {
          _id: '$region',
          name: { $first: "$region" },
        }
      },
    ]);

    
    res.status(200).json({data}); 

  } catch (error) {
    console.error('Error fetching data: ', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};



export const PestOptions = async (req, res) => {
  try {
    const data = await Datas.aggregate([
      {
        $match: {
          pestle: { $nin: ["", undefined, null, []] }
        }
    },    
      {
        $group: {
          _id: '$pestle',
          name: { $first: "$pestle" },
        }
      },
    ]);

    
    res.status(200).json({data}); 

  } catch (error) {
    console.error('Error fetching data: ', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const SourceOptions = async (req, res) => {
  try {
    const data = await Datas.aggregate([
      {
        $match: {
          source: { $nin: ["", undefined, null, []] }
        }
    },    
      {
        $group: {
          _id: '$source',
          name: { $first: "$source" },
        }
      },
    ]);

    
    res.status(200).json({data}); 

  } catch (error) {
    console.error('Error fetching data: ', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export const CountryOptions = async (req, res) => {
  try {
    const data = await Datas.aggregate([
      {
        $match: {
          country: { $nin: ["", undefined, null, []] }
        }
    },    
      {
        $group: {
          _id: '$country',
          name: { $first: "$country" },
        }
      },
    ]);

    
    res.status(200).json({data}); 

  } catch (error) {
    console.error('Error fetching data: ', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


export const TopCountry = async (req, res) => {
  try {
    const data = await Datas.aggregate([
      {
        $match: {
          country: { $nin: ["", undefined, null, []] }
        }
    },    
      {
        $group: {
          _id: '$country',
          name: { $first: "$country" },
          value:{$sum:1}
        }
      },
      {
        $sort:{value:-1}
      },
      {
        $limit:10
      }
    ]);

    
    res.status(200).json({data}); 

  } catch (error) {
    console.error('Error fetching data: ', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

  

  
export const listAll = async (req, res) => {
  try {
    let { page = 1, limit = 10, pestle, source, country } = req.query;

    page = Number(page);
    limit = Number(limit);
    let skip = (page - 1) * limit;

    let match = {};

    const isNull = (value) => value === "" || value === undefined || value === null;    

    if (!isNull(pestle)) {
      match.pestle = pestle;
    }
    

    if (!isNull(source)) {
      match.source = source;
    }
    
    if (!isNull(country)) {
      match.country = country;
    }

    

    const count = await Datas.countDocuments(match).exec();
    const data = await Datas.aggregate([
      {
        $match: match
      },
      {
        $project: {
          _id: 0,
          pestle: 1,
          source: 1,
          country: 1,
          city: 1
        }
      },
      {
        $skip: skip 
      },
      {
        $limit: limit 
      }
    ]);

    res.status(200).json({count, data });
  } catch (error) {
    console.error('Error fetching data:', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};



export const PestGraph = async (req, res) => {
  try {
    const startDate = 2014;
    const endDate = 2024;

    const match = {
      end_year: {
        $gte: startDate,
        $lte: endDate
      }
    };

    const data = await Datas.aggregate([
      {
        $match: {
          pestle: { $nin: ["", undefined, null, []] }
        }
    },       {
        $group: {
          _id: "$pestle",
          pestle: { $sum: 1}, // Handles potential null values
        }
      },
      { $sort: { "_id": 1 } }, // Sort by year in ascending order
      {
        $project: {
          _id: 0,
          year: "$_id",
          pestle: 1,
        }
      },
      {
        $group: {
          _id: null,
          pestle: { $push: "$pestle" },
          label: { $push: "$year" }
        }
      }
    ]);

    res.status(200).json({ data });
  } catch (error) {
    console.error('Error fetching data: ', error.message);
    res.status(500).json({ message: 'Server Error' });
  }
};



