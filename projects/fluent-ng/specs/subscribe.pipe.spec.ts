import {SubscribePipe} from '../src/public-api';
import {ChangeDetector} from './stubs';
import {Subject} from 'rxjs';

describe('SubscribePipe', () => {
  it('should return null on first transform', () => {
    const pipe = createPipe();

    const subject = new Subject();

    expect(pipe.transform(subject)).toEqual(null);
  });

  it('should preload default value on first transform', () => {
    const pipe = createPipe();

    const subject = new Subject();

    expect(pipe.transform(subject, 'default')).toEqual('default');
  });

  it('should return null while awaits for data and then return subject result', () => {
    const pipe = createPipe();

    const subject = new Subject();

    expect(pipe.transform(subject)).toEqual(null);
    expect(pipe.transform(subject)).toEqual(null);

    subject.next('it works!');
    expect(pipe.transform(subject)).toEqual('it works!');
  });

  it('should return default value while awaits for data and then return subject result', () => {
    const pipe = createPipe();

    const subject = new Subject();

    expect(pipe.transform(subject, 'default')).toEqual('default');
    expect(pipe.transform(subject, 'default')).toEqual('default');

    subject.next('it works!');
    expect(pipe.transform(subject)).toEqual('it works!');
  });

  it('should return the same result after each next value received from observable', () => {
    const pipe = createPipe();

    const subject = new Subject();

    expect(pipe.transform(subject)).toEqual(null);

    subject.next('it works!');
    expect(pipe.transform(subject)).toEqual('it works!');
    expect(pipe.transform(subject)).toEqual('it works!');
    expect(pipe.transform(subject)).toEqual('it works!');

    subject.next('it works as well!');
    expect(pipe.transform(subject)).toEqual('it works as well!');
    expect(pipe.transform(subject)).toEqual('it works as well!');
    expect(pipe.transform(subject)).toEqual('it works as well!');
  });

  it('should return null when given null', () => {
    const pipe = createPipe();
    expect(pipe.transform(null)).toEqual(null);
  });

  it('should throw error when given an invalid object', () => {
    const pipe = createPipe();
    expect(() => pipe.transform(<any>'not supported type')).toThrowError();
  });

  it('should not throw errors on destroy', () => {
    const pipe = createPipe();
    expect(() => pipe.ngOnDestroy()).not.toThrow();
  });
});

function createPipe() {
  return new SubscribePipe(new ChangeDetector());
}

