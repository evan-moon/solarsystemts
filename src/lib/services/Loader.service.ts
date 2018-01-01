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

    public load () {
        let defer = Q.defer();
        this.shaders = [ VertexShader, FragmentShader ];
        defer.resolve();

        return defer.promise;
    }

    public getShaders (): string[] {
        return this.shaders;
    }

    public getVertexShader (): string {
        return this.shaders[0];
    }

    public getFregmentShader (): string {
        return this.shaders[1];
    }

    public removeShaders () {
        this.shaders = [];
    }
}

const instance = new LoaderService();
export default instance;
