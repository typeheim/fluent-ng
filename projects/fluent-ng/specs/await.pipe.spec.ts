import { AwaitPipe } from '../src/public-api';
import { ChangeDetector } from './stubs';

describe('AwaitPipe', () => {

  it('should return null on first transform', () => {
    const pipe = createPipe();

    const promise = new Promise((resolve) => resolve('it works!'));

    expect(pipe.transform(promise)).toEqual(null);
  });

  it('should return default value on first transform', () => {
    const pipe = createPipe();

    const promise = new Promise((resolve) => resolve('it works!'));

    expect(pipe.transform(promise, { default: 'default' })).toEqual('default');
  });

  it('should return null while awaits for data and then return promise result', async (done) => {
    const pipe = createPipe();

    const promise = new Promise((resolve) => resolve('it works!'));

    expect(pipe.transform(promise)).toEqual(null);
    expect(pipe.transform(promise)).toEqual(null);

    // need to ensure promise is resolved before testing pipe result
    await promise;
    expect(pipe.transform(promise)).toEqual('it works!');

    done();
  });

  it('should return default value while awaits for data and then return promise result', async (done) => {
    const pipe = createPipe();

    const promise = new Promise((resolve) => resolve('it works!'));

    expect(pipe.transform(promise, { default: 'default' })).toEqual('default');
    expect(pipe.transform(promise, { default: 'default' })).toEqual('default');

    // need to ensure promise is resolved before testing pipe result
    await promise;
    expect(pipe.transform(promise)).toEqual('it works!');

    done();
  });

  it('should return the same result once promise resolved', async (done) => {
    const pipe = createPipe();

    const promise = new Promise((resolve) => resolve('it works!'));

    expect(pipe.transform(promise)).toEqual(null);
    // need to ensure promise is resolved before testing pipe result
    await promise;
    expect(pipe.transform(promise)).toEqual('it works!');
    expect(pipe.transform(promise)).toEqual('it works!');
    expect(pipe.transform(promise)).toEqual('it works!');

    done();
  });

  it('should return null when given null', () => {
    const pipe = createPipe();
    expect(pipe.transform(null)).toEqual(null);
  });

  it('should throw when given an invalid object', () => {
    const pipe = createPipe();
    expect(() => pipe.transform(<any> 'not supported type')).toThrowError();
  });

  it('should not throw errors on destroy', () => {
    const pipe = createPipe();
    expect(() => pipe.ngOnDestroy()).not.toThrow();
  });
});


function createPipe() {
  return new AwaitPipe(new ChangeDetector());
}
