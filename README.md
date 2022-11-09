<h3 align="center">Upx Agro</h3>

---

<p align="center"> Functions for manipulating the firebase database; serverless functions using cloud functions 
    <br> 
</p>

## 📝 Table of Contents

- [About](#about)
- [Docs](#docs)

## 🧐 About <a name = "about"></a>

Project for college course of UPX (Usina de projetos experimentais), the project consists in a mobile game of farm management, this part of the project is the serverless API functions

## 📃 Docs <a name = "docs"></a>

### saveFarm

#### Full path
```
/saveFarm
```

#### Body params
```
    farmId: string, // opcional
    farmName: string,
    currency: number,
    currencyPaid: number,
    placedObjects: {
        buildingId: number,
        origin_x: number,
        origin_y: number,
        direction: number,
        worldPos_x: number,
        worldPos_y: number,
        worldPos_z: number,
        buildingData: json,
    }[],
```

#### Response success
```
    msg: string,
    data: 
        farmId: string,
        farmName: string,
        currency: number,
        currencyPaid: number,
        placedObjects: {
            buildingId: number,
            origin_x: number,
            origin_y: number,
            direction: number,
            worldPos_x: number,
            worldPos_y: number,
            worldPos_z: number,
            buildingData: json,
        }[],
    }
```

### getFarm

#### Full path
```
/getFarm
```

#### Url params
```
    farmId: string, // opcional,
```

#### Response success
```
    msg: string,
    data: 
        farmId: string,
        farmName: string,
        currency: number,
        currencyPaid: number,
        placedObjects: {
            buildingId: number,
            origin_x: number,
            origin_y: number,
            direction: number,
            worldPos_x: number,
            worldPos_y: number,
            worldPos_z: number,
            buildingData: json,
        }[],
    }
```