// Administrador: fila de comprovantes de ausência (atestado / declaração)
import { useState, useEffect } from 'react';
import Layout from '../components/dashboard/Layout';
import { comprovanteAusenciaService } from '../services/api';

const STATUS_FILTRO = [
  { value: '', label: 'Todos' },
  { value: 'PENDENTE', label: 'Pendentes' },
  { value: 'APROVADO', label: 'Aprovados' },
  { value: 'REJEITADO', label: 'Rejeitados' },
];

async function abrirArquivoComprovante(id) {
  try {
    const { data } = await comprovanteAusenciaService.obter(id);
    if (data.urlVisualizacao) {
      window.open(data.urlVisualizacao, '_blank', 'noopener,noreferrer');
    } else {
      alert('Não foi possível gerar o link do arquivo. Verifique S3 ou tente novamente.');
    }
  } catch (e) {
    const msg = e.response?.data?.error || e.message || 'Erro ao abrir';
    alert(msg);
  }
}

export default function AusenciasEmpresa() {
  const [filtro, setFiltro] = useState('PENDENTE');
  const [lista, setLista] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const [erroApi, setErroApi] = useState('');
  const [modal, setModal] = useState(null); // { item, acao: 'APROVADO' | 'REJEITADO' }
  const [obs, setObs] = useState('');
  const [salvando, setSalvando] = useState(false);

  async function carregar() {
    setCarregando(true);
    setErroApi('');
    try {
      const { data } = await comprovanteAusenciaService.listar(filtro ? { status: filtro } : {});
      setLista(Array.isArray(data) ? data : []);
    } catch (e) {
      setLista([]);
      const status = e.response?.status;
      const msg = e.response?.data?.error || e.message || 'Falha ao carregar a lista';
      if (status === 403) {
        setErroApi(
          `${msg} Se você usa conta Super Admin, entre como administrador da empresa para ver os comprovantes.`
        );
      } else {
        setErroApi(msg);
      }
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregar();
  }, [filtro]);

  async function confirmarDecisao() {
    if (!modal) return;
    setSalvando(true);
    try {
      await comprovanteAusenciaService.decidir(modal.item.id, {
        status: modal.acao,
        observacaoAdmin: obs.trim() || undefined,
      });
      setModal(null);
      setObs('');
      await carregar();
    } catch (e) {
      alert(e.response?.data?.error || e.message || 'Erro ao salvar');
    } finally {
      setSalvando(false);
    }
  }

  function badge(s) {
    if (s === 'PENDENTE') return <span className="badge" style={{ background: '#fef3c7', color: '#92400e' }}>Pendente</span>;
    if (s === 'APROVADO') return <span className="badge badge-verde">Aprovado</span>;
    return <span className="badge badge-vermelho">Rejeitado</span>;
  }

  return (
    <Layout>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24, flexWrap: 'wrap', gap: 16 }}>
        <div>
          <h1 style={{ fontSize: 24, fontWeight: 700 }}>Ausências e comprovantes</h1>
          <p style={{ color: 'var(--cinza-400)', fontSize: 14, marginTop: 4 }}>
            Colaboradores enviam atestado ou documento; você aprova ou rejeita com observação opcional.
          </p>
        </div>
        <select className="input" value={filtro} onChange={(e) => setFiltro(e.target.value)} style={{ minWidth: 160 }}>
          {STATUS_FILTRO.map((o) => (
            <option key={o.value || 'all'} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
      </div>

      {erroApi && (
        <div
          style={{
            background: 'var(--vermelho-claro)',
            color: 'var(--vermelho)',
            padding: '12px 16px',
            borderRadius: 8,
            fontSize: 14,
            marginBottom: 16,
            lineHeight: 1.45,
          }}
        >
          {erroApi}
        </div>
      )}

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        {carregando ? (
          <div style={{ display: 'flex', justifyContent: 'center', padding: 48 }}>
            <div className="spinner" />
          </div>
        ) : lista.length === 0 && !erroApi ? (
          <p style={{ padding: 32, textAlign: 'center', color: 'var(--cinza-400)' }}>
            Nenhum registro neste filtro. Confira se a migração do banco foi aplicada e se o colaborador é da mesma empresa.
          </p>
        ) : lista.length === 0 ? null : (
          <table className="tabela">
            <thead>
              <tr>
                <th>Data(s)</th>
                <th>Colaborador</th>
                <th>Tipo</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {lista.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontSize: 13 }}>
                    {c.dataReferencia}
                    {c.dataFim && c.dataFim !== c.dataReferencia ? ` — ${c.dataFim}` : ''}
                  </td>
                  <td>
                    <div style={{ fontWeight: 500 }}>{c.usuario?.nome}</div>
                    <div style={{ fontSize: 12, color: 'var(--cinza-400)' }}>{c.usuario?.email}</div>
                  </td>
                  <td style={{ fontSize: 13 }}>{c.tipoArquivo === 'pdf' ? 'PDF' : 'Imagem'}</td>
                  <td>{badge(c.status)}</td>
                  <td>
                    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
                      <button
                        type="button"
                        className="btn btn-secondary"
                        style={{ fontSize: 12, padding: '6px 12px' }}
                        onClick={() => abrirArquivoComprovante(c.id)}
                      >
                        Ver arquivo
                      </button>
                      {c.status === 'PENDENTE' && (
                        <>
                          <button
                            type="button"
                            className="btn btn-primary"
                            style={{ fontSize: 12, padding: '6px 12px' }}
                            onClick={() => {
                              setObs('');
                              setModal({ item: c, acao: 'APROVADO' });
                            }}
                          >
                            Aprovar
                          </button>
                          <button
                            type="button"
                            style={{
                              fontSize: 12,
                              padding: '6px 12px',
                              background: 'transparent',
                              border: '1px solid var(--vermelho)',
                              color: 'var(--vermelho)',
                              borderRadius: 8,
                              cursor: 'pointer',
                            }}
                            onClick={() => {
                              setObs('');
                              setModal({ item: c, acao: 'REJEITADO' });
                            }}
                          >
                            Rejeitar
                          </button>
                        </>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {modal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 20 }}>
          <div className="card" style={{ maxWidth: 420, width: '100%', padding: 28 }}>
            <h3 style={{ fontSize: 17, fontWeight: 600, marginBottom: 12 }}>
              {modal.acao === 'APROVADO' ? 'Aprovar comprovante' : 'Rejeitar comprovante'}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--cinza-600)', marginBottom: 16 }}>
              {modal.item.usuario?.nome} · {modal.item.dataReferencia}
            </p>
            <label style={{ fontSize: 13, color: 'var(--cinza-600)' }}>Observação (opcional, visível ao colaborador)</label>
            <textarea className="input" rows={3} value={obs} onChange={(e) => setObs(e.target.value)} style={{ width: '100%', marginTop: 8, marginBottom: 20 }} placeholder="Ex.: deferido conforme documento médico" />
            <div style={{ display: 'flex', gap: 12 }}>
              <button type="button" className="btn btn-secondary btn-full" onClick={() => setModal(null)} disabled={salvando}>
                Cancelar
              </button>
              <button
                type="button"
                className="btn btn-full"
                style={modal.acao === 'REJEITADO' ? { background: 'var(--vermelho)', color: '#fff', border: 'none' } : {}}
                onClick={confirmarDecisao}
                disabled={salvando}
              >
                {salvando ? 'Salvando…' : 'Confirmar'}
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}
