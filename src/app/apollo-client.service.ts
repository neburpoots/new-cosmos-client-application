import { Injectable } from '@angular/core';
import { ApolloClientOptions, InMemoryCache, ApolloLink } from '@apollo/client/core';
import { createHttpLink } from '@apollo/client/link/http';
//import { ServerError } from '@apollo/client/core';
import { onError } from '@apollo/client/link/error';
import { Router } from '@angular/router';

//------------------------------------------------------------------------------
const uri = 'http://localhost:8080/graphql'; // <-- add the URL of the GraphQL server here

//------------------------------------------------------------------------------
@Injectable
(
	{
		providedIn: 'root'
	}
)
export class ApolloClientService 
{	
	private options: ApolloClientOptions<any> | null = null;
	
	constructor(private router: Router) 
	{ 		
	}
	
	async getOptionsPromise()
	{
		const errorLink = onError
		(
			({graphQLErrors, networkError, operation, forward}) => 
			{
				//console.log(graphQLErrors);
				//console.log(networkError);
				if (networkError)				
				{
					if ('statusCode' in networkError)
					{
						if (networkError['statusCode'] === 401)
						{
							//console.log('401');
							this.router.navigate(['/logout']);					
							return;
						}
					}					
				}
				
				if (graphQLErrors)
				{
					graphQLErrors.forEach
					(
						graphQLError => 
						{
							//console.log(extensions);
							//console.log(graphQLError['errcode']);
						}
					);
				
					//console.log(graphQLErrors);
				}

				return forward(operation);			
			}
		);	

		const authMiddleware = new ApolloLink
		(
			(operation, forward) => 
			{
				const jwtToken = localStorage.getItem('jwtToken');					
				//console.log('jwtToken...', 'jwtToken');
				//const jwtToken = "abc";
				//operation.setContext({headers: { Authorization: '' }});
				if (jwtToken) 
				{					
					operation.setContext({headers: { Authorization: `Bearer ${jwtToken}` }});
				} 
				
				return forward(operation);
			}
		);	

		const cache = new InMemoryCache
		(
			{
				typePolicies: 
				{				
					Query:
					{
						fields: 
						{
							jwtToken: 
							{							
								read(_) 
								{			
									//console.log(localStorage.getItem('jwtToken'));
									return localStorage.getItem('jwtToken');
								},
								merge(_, incoming: any)
								{
									//console.log(incoming);
									incoming ? localStorage.setItem('jwtToken', incoming) : localStorage.removeItem('jwtToken');
									return incoming;
								}
							},
							debiteurByCddebiteur(_, { args, toReference }) 
							{
								return toReference({__typename: 'Debiteur', cddebiteur: args?.['cddebiteur']});
							},
							detectorById(_, { args, toReference }) 
							{
								return toReference({__typename: 'Detector', id: args?.['id']});
							},
							detectorSensorById(_, { args, toReference }) 
							{
								return toReference({__typename: 'DetectorSensor', id: args?.['id']});
							},
							detectorSensorLocationById(_, { args, toReference }) 
							{
								return toReference({__typename: 'DetectorSensorLocation', id: args?.['id']});
							},
							detectorLocationById(_, { args, toReference }) 
							{
								return toReference({__typename: 'DetectorLocation', id: args?.['id']});
							},
							detectorTypeById(_, { args, toReference }) 
							{
								return toReference({__typename: 'DetectorType', id: args?.['id']});
							},
							factureeropdrachtByFactuuropdracht(_, { args, toReference }) 
							{
								return toReference({__typename: 'Factureeropdracht', factuuropdracht: args?.['factuuropdracht']});
							},
							groupById(_, { args, toReference }) 
							{
								return toReference({__typename: 'Group', id: args?.['id']});
							},	
							sensorById(_, { args, toReference }) 
							{
								return toReference({__typename: 'Sensor', id: args?.['id']});
							},
							sensorBaseTypeById(_, { args, toReference }) 
							{
								return toReference({__typename: 'SensorBaseType', id: args?.['id']});
							},
							sensorOrderById(_, { args, toReference }) 
							{
								return toReference({__typename: 'SensorOrder', id: args?.['id']});
							},
							sensorTestResultById(_, { args, toReference }) 
							{
								return toReference({__typename: 'SensorTestResult', id: args?.['id']});
							},
							sensorTypeById(_, { args, toReference }) 
							{
								return toReference({__typename: 'SensorType', id: args?.['id']});
							},
							relatieByCdrelatie(_, { args, toReference }) 
							{
								return toReference({__typename: 'Relatie', cdrelatie: args?.['cdrelatie']});
							},
							userById(_, { args, toReference }) 
							{
								return toReference({__typename: 'User', id: args?.['id']});
							},																				
						}
					},
					CalGas:
					{
						fields: 
						{																		
							gasByGasId(_, { readField, toReference }) 
							{						
								const id = readField('gasId');										
								return id ? toReference({__typename: 'Gas', id}) : null;
							},
						}
					},
					Debiteur:
					{
						keyFields: ["cddebiteur"],
						fields: 
						{
							relatieByCdrelatie(_, { readField, toReference }) 
							{
								const cdrelatie = readField('cdrelatie');							
								return cdrelatie ? toReference({__typename: 'Relatie', cdrelatie}) : null;
							},
						}
					},	
					Detector:
					{
						fields: 
						{																		
							detectorTypeByDetectorTypeId(_, { readField, toReference }) 
							{						
								const id = readField('detectorTypeId');										
								return id ? toReference({__typename: 'DetectorType', id}) : null;
							},
						}
					},
					Factureeropdracht:
					{
						keyFields: ["factuuropdracht"],
						fields:
						{
							debiteurByCddebiteur(_, { readField, toReference }) 
							{						
								const cddebiteur = readField('cddebiteur');
								return cddebiteur ? toReference({__typename: 'Debiteur', cddebiteur}) : null;
							},
						}
					},					
					Range:
					{
						fields: 
						{																		
							gasByGasId(_, { readField, toReference }) 
							{						
								const id = readField('gasId');										
								return id ? toReference({__typename: 'Gas', id}) : null;
							},
						}
					},
					Sensor:
					{
						fields: 
						{																		
							sensorTypeBySensorTypeId(_, { readField, toReference }) 
							{						
								const id = readField('sensorTypeId');										
								return id ? toReference({__typename: 'SensorType', id}) : null;
							},
						}
					},
					SensorBaseType:
					{
						fields: 
						{																		
							principleByPrincipleId(_, { readField, toReference }) 
							{						
								const id = readField('principleId');										
								return id ? toReference({__typename: 'Principle', id}) : null;
							},							
						}
					},
					SensorOrder:
					{
						fields: 
						{																		
							factureeropdrachtByFactuuropdracht(_, { readField, toReference }) 
							{						
								const factuuropdracht = readField('factuuropdracht');										
								return factuuropdracht ? toReference({__typename: 'Factureeropdracht', factuuropdracht}) : null;
							},
							sensorBySensorId(_, { readField, toReference }) 
							{						
								const id = readField('sensorId');										
								return id ? toReference({__typename: 'Sensor', id}) : null;
							},
						}
					},
					SensorTestResult:
					{
						fields: 
						{	
							calGasByFsCalGasId(_, { readField, toReference }) 
							{						
								const id = readField('fsCalGasId');										
								return id ? toReference({__typename: 'CalGas', id}) : null;
							},
							sensorBySensorId(_, { readField, toReference }) 
							{						
								const id = readField('sensorId');										
								return id ? toReference({__typename: 'Sensor', id}) : null;
							},
							sensorOrderBySensorOrderId(_, { readField, toReference }) 
							{						
								const id = readField('sensorOrderId');										
								return id ? toReference({__typename: 'SensorOrder', id}) : null;
							},							
							userByUserId(_, { readField, toReference }) 
							{						
								const id = readField('userId');										
								return id ? toReference({__typename: 'User', id}) : null;
							},
							userByOwnerId(_, { readField, toReference }) 
							{						
								const id = readField('ownerId');										
								return id ? toReference({__typename: 'User', id}) : null;
							},
						}
					},
					SensorType:
					{
						fields: 
						{	
							calGasByCalGasId(_, { readField, toReference }) 
							{						
								const id = readField('calGasId');										
								return id ? toReference({__typename: 'CalGas', id}) : null;
							},
							electrolyteByElectrolyteId(_, { readField, toReference }) 
							{						
								const id = readField('electrolyteId');										
								return id ? toReference({__typename: 'Electrolyte', id}) : null;
							},
							filterByFilterId(_, { readField, toReference }) 
							{						
								const id = readField('filterId');										
								return id ? toReference({__typename: 'Filter', id}) : null;
							},
							membraneByMembraneId(_, { readField, toReference }) 
							{						
								const id = readField('membraneId');										
								return id ? toReference({__typename: 'Membrane', id}) : null;
							},
							oRingByORingId(_, { readField, toReference }) 
							{						
								const id = readField('oRingId');										
								return id ? toReference({__typename: 'ORing', id}) : null;
							},
							pyrolyserByPyrolyserId(_, { readField, toReference }) 
							{						
								const id = readField('pyrolyserId');										
								return id ? toReference({__typename: 'Pyrolyser', id}) : null;
							},
							rangeByRangeId(_, { readField, toReference }) 
							{						
								const id = readField('rangeId');										
								return id ? toReference({__typename: 'Range', id}) : null;
							},
							sensorBaseTypeBySensorBaseTypeId(_, { readField, toReference }) 
							{						
								const id = readField('sensorBaseTypeId');										
								return id ? toReference({__typename: 'SensorBaseType', id}) : null;
							},
						}
					}
				}
			}
		);



		this.options = {						
			link: ApolloLink.from([errorLink, authMiddleware, createHttpLink({uri: uri})]),			
			cache: cache,			
		};		
	}
	
	getOptions()
	{
		return this.options;
	}
}
