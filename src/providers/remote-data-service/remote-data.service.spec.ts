import { TestBed, async, inject } from '@angular/core/testing';
import { BaseRequestOptions, Http, ResponseOptions, XHRBackend, Response, RequestMethod } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';
import { RemoteDataService } from './remote-data.service';

describe('RemoteDataService', () => {
  let mockBackend: MockBackend;
  let remoteDataService: RemoteDataService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        BaseRequestOptions,
        MockBackend,
        RemoteDataService,
        {
          provide: Http,
          useFactory: (backend: MockBackend, options: BaseRequestOptions) => new Http(backend, options),
          deps: [ MockBackend, BaseRequestOptions ]
        }
      ]
    });
  }));

  beforeEach(inject([ MockBackend, Http ],
    (mb: MockBackend, http: Http) => {
      mockBackend = mb;
      remoteDataService = new RemoteDataService(http);
    }));

  it('should exist', inject([RemoteDataService], (service: RemoteDataService) => {
    expect(service).toBeTruthy();
  }));

  describe('getData()', () => {
    it('should return an Observable<any>',
      inject([RemoteDataService], (service: RemoteDataService) => {
        const mockResponse = {
          name: 'Test company',
          meters: [{
            'meterType': 'Electricity',
            'name': 'Overall electricity',
            'supplierId': null
          }],
          locations: [{
            'name': 'Main building',
            'meters': [{
              'meterType': 'Electricity',
              'name': 'Main building electricity',
              'supplierId': 'S01'
            }],
            'locations': [{
              'name': 'Main building foyer',
              'meters': [{
                'meterType': 'Electricity',
                'name': 'Main foyer lighting',
                'supplierId': 'ABC2'
              }]
            }]
          }]
        };

        mockBackend.connections.subscribe((connection: MockConnection) => {
          connection.mockRespond(new Response(new ResponseOptions({
            body: {data: mockResponse}
          })));
        });

        remoteDataService.getData().subscribe((response) => {
          const data = response.data;
          expect(data.name).toEqual('Test company');
          expect(data.locations.length).toBe(1);
        });
      })
    );
  });
});
