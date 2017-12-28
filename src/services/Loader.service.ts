/**
 * @name Loader.service
 * @author Evan Moon
 * @desc 시뮬레이터에 필요한 에셋들을 로딩하는 클래스
 */

import * as Q from 'q';

import VertexShader from 'src/shaders/atmosphere.vsh';
import FragmentShader from 'src/shaders/atmosphere.fsh';

class LoaderService {
    private shaders: string[]; // raw shader resources

    load () {
        let defer = Q.defer();
        this.shaders = [ VertexShader, FragmentShader ];
        defer.resolve();

        return defer.promise;
    }

    getShaders (): string[] {
        return this.shaders;
    }

    removeShaders () {
        this.shaders = [];
    }
}

const instance = new LoaderService();
export default instance;
