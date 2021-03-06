(function () {
  'use strict';

  describe('Tips Route Tests', function () {
    // Initialize global variables
    var $scope,
      TipsService;

    //We can start by loading the main application module
    beforeEach(module(ApplicationConfiguration.applicationModuleName));

    // The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
    // This allows us to inject a service but then attach it to a variable
    // with the same name as the service.
    beforeEach(inject(function ($rootScope, _TipsService_) {
      // Set a new global scope
      $scope = $rootScope.$new();
      TipsService = _TipsService_;
    }));

    describe('Route Config', function () {
      describe('Main Route', function () {
        var mainstate;
        beforeEach(inject(function ($state) {
          mainstate = $state.get('tips');
        }));

        it('Should have the correct URL', function () {
          expect(mainstate.url).toEqual('/tips');
        });

        it('Should be abstract', function () {
          expect(mainstate.abstract).toBe(true);
        });

        it('Should have template', function () {
          expect(mainstate.template).toBe('<ui-view/>');
        });
      });

      describe('View Route', function () {
        var viewstate,
          TipsController,
          mockTip;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          viewstate = $state.get('tips.view');
          $templateCache.put('modules/tips/client/views/view-tip.client.view.html', '');

          // create mock Tip
          mockTip = new TipsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Tip Name'
          });

          //Initialize Controller
          TipsController = $controller('TipsController as vm', {
            $scope: $scope,
            tipResolve: mockTip
          });
        }));

        it('Should have the correct URL', function () {
          expect(viewstate.url).toEqual('/:tipId');
        });

        it('Should have a resolve function', function () {
          expect(typeof viewstate.resolve).toEqual('object');
          expect(typeof viewstate.resolve.tipResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(viewstate, {
            tipId: 1
          })).toEqual('/tips/1');
        }));

        it('should attach an Tip to the controller scope', function () {
          expect($scope.vm.tip._id).toBe(mockTip._id);
        });

        it('Should not be abstract', function () {
          expect(viewstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(viewstate.templateUrl).toBe('modules/tips/client/views/view-tip.client.view.html');
        });
      });

      describe('Create Route', function () {
        var createstate,
          TipsController,
          mockTip;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          createstate = $state.get('tips.create');
          $templateCache.put('modules/tips/client/views/form-tip.client.view.html', '');

          // create mock Tip
          mockTip = new TipsService();

          //Initialize Controller
          TipsController = $controller('TipsController as vm', {
            $scope: $scope,
            tipResolve: mockTip
          });
        }));

        it('Should have the correct URL', function () {
          expect(createstate.url).toEqual('/create');
        });

        it('Should have a resolve function', function () {
          expect(typeof createstate.resolve).toEqual('object');
          expect(typeof createstate.resolve.tipResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(createstate)).toEqual('/tips/create');
        }));

        it('should attach an Tip to the controller scope', function () {
          expect($scope.vm.tip._id).toBe(mockTip._id);
          expect($scope.vm.tip._id).toBe(undefined);
        });

        it('Should not be abstract', function () {
          expect(createstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(createstate.templateUrl).toBe('modules/tips/client/views/form-tip.client.view.html');
        });
      });

      describe('Edit Route', function () {
        var editstate,
          TipsController,
          mockTip;

        beforeEach(inject(function ($controller, $state, $templateCache) {
          editstate = $state.get('tips.edit');
          $templateCache.put('modules/tips/client/views/form-tip.client.view.html', '');

          // create mock Tip
          mockTip = new TipsService({
            _id: '525a8422f6d0f87f0e407a33',
            name: 'Tip Name'
          });

          //Initialize Controller
          TipsController = $controller('TipsController as vm', {
            $scope: $scope,
            tipResolve: mockTip
          });
        }));

        it('Should have the correct URL', function () {
          expect(editstate.url).toEqual('/:tipId/edit');
        });

        it('Should have a resolve function', function () {
          expect(typeof editstate.resolve).toEqual('object');
          expect(typeof editstate.resolve.tipResolve).toEqual('function');
        });

        it('should respond to URL', inject(function ($state) {
          expect($state.href(editstate, {
            tipId: 1
          })).toEqual('/tips/1/edit');
        }));

        it('should attach an Tip to the controller scope', function () {
          expect($scope.vm.tip._id).toBe(mockTip._id);
        });

        it('Should not be abstract', function () {
          expect(editstate.abstract).toBe(undefined);
        });

        it('Should have templateUrl', function () {
          expect(editstate.templateUrl).toBe('modules/tips/client/views/form-tip.client.view.html');
        });

        xit('Should go to unauthorized route', function () {

        });
      });

    });
  });
})();
