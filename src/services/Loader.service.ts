/**
 * @name LoaderService
 * @author Evan Moon
 * @desc 시뮬레이터에 필요한 에셋들을 로딩하는 서비스
 */

import * as $ from 'jquery';
import * as Q from 'q';
import { Scenario } from 'src/constants/scenario.constant';

import VertexShader from 'src/shaders/atmosphere.vsh';
import FragmentShader from 'src/shaders/atmosphere.fsh';

class LoaderService {
    shaders: string[];

    load (scenario: Scenario) {
        this.shaders = [ VertexShader, FragmentShader ];
    }

    removeShaders () {
        this.shaders = [];
    }
}

const instance = new LoaderService();
export default instance;
